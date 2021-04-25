import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';

import {
    Modal,
    InviteMembers
} from 'components';
import {
    HomeContext,
    MemberContext,
    ModalContext,
    TeamContext
} from 'contexts';
import { MEMBER_PAGE_SIZE } from 'actions';

export const AddMember = ({ open = false, onCancel }) => {
    const { setNotificationMessage } = useContext(HomeContext);
    const { setAddMember } = useContext(ModalContext);
    const { team } = useContext(TeamContext);
    const { members, allMembers, doGetMembers, doAddMember, setAllMembers } = useContext(MemberContext);

    const { handleSubmit, register, errors, formState, reset, getValues } = useForm();
    const [mems, setMems] = useState([]);
    const [memberLoading, setMemberLoading] = useState(false);
    const [tempAllMembers, setTempAllMembers] = useState([]);

    /*eslint-disable */
    useEffect(() => {
        if (open) doGetMembers({
            // page: 0,
            // limit: MEMBER_PAGE_SIZE,
            isSearching: true,
            sort: 'name_asc',
            listing: true
        });
    }, [open])

    useEffect(() => {
        if (!tempAllMembers.length) {
            setTempAllMembers(allMembers);
        }
    }, [allMembers])

    useEffect(() => {
        if (tempAllMembers.length > 0) setAllMembers(tempAllMembers);
    }, [mems])
    /*eslint-enable */

    const handleAddTeam = memId => {
        setMems(oldMems => [...oldMems.map(mem => {
            if (mem.id === memId) {
                return {
                    ...mem,
                    teams: [
                        ...mem.teams,
                        {
                            id: null,
                            role: null
                        }
                    ]
                }
            }
            return mem;
        })]);
    }

    const addMember = data => {
        if (!mems.length) return;

        if (!team) {
            const payload = {
                members: mems.map(mem => {
                    const newMem = {
                        memberId: mem.id,
                        email: mem.id ? mem.description : mem.title,
                        orgRole: data[`orgRole${mem.id}`]
                    }
                    if (mem.teams && mem.teams.length > 0) {
                        newMem.teamRoles = mem.teams.map((team, teamIndex) => {
                            return {
                                teamId: data[`team${teamIndex}${mem.id}`],
                                roleName: data[`teamRole${teamIndex}${mem.id}`]
                            }
                        })
                    }
                    return newMem
                })
            }
    
            doAddMember(payload, () => {
                reset();
                setAddMember(false);
                setMems([]);
                setNotificationMessage(`
                    <p>Members have been added successfully!</p>
                `);
            });
        }

        if (team) {
            const payload = {
                members: mems.map(mem => {
                    return {
                        memberId: mem.id,
                        email: mem.id ? mem.description : mem.title,
                        teamRoles: [
                            {
                                teamId: team._id,
                                roleName: data[`teamRole${mem.id}`]
                            }
                        ]
                    }
                })
            }
    
            doAddMember(payload, () => {
                reset();
                setAddMember(false);
                setMems([]);
                setNotificationMessage(`
                    <p>Members have been added successfully!</p>
                `);
            });
        }
    }

    const onHideAddMemberModal = () => {
        reset();
        setMems([]);
        onCancel();
    }

    const getMembers = value => {
        setMemberLoading(true);

        doGetMembers({
            term: value,
            page: 0,
            limit: MEMBER_PAGE_SIZE,
            isSearching: true,
            sort: 'name_asc',
            listing: true
        }, () => {
            setMemberLoading(false);
        }, false);
    };

    const handleAddItem = () => {
        if (tempAllMembers.length > 0) setAllMembers(tempAllMembers);
    }

    return (
        <Modal
            open={open}
            className="tr__add-member"
            onCancel={onHideAddMemberModal}
            title={`Add New Members to ${team ? `"${team.name}"` : ''}`}
            submitButton
            submitButtonLabel="Add"
            footerLabel="We will invite all new members on behalf of you"
            isBackDropClickable={false}
            renderForm={children => (
                <form onSubmit={handleSubmit(addMember)}>
                    {children}
                </form>
            )}
        >
            <InviteMembers
                title="Invite Members" 
                isMember={true}
                register={register}
                members={allMembers.filter(mem => !(members.some(m => m._id === mem._id) || mems.some(m => m.id === mem._id)))}
                errors={errors}
                selectedMembers={mems}
                setSelectedMembers={setMems}
                onInputChange={getMembers}
                onAddItem={handleAddItem}
                searchLoading={memberLoading}
                formState={formState}
                handleAddTeam={handleAddTeam}
                getValues={getValues}
            />
        </Modal>
    )
};
