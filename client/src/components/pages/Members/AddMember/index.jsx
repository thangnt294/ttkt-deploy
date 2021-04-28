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
import {useParams} from "react-router-dom";

export const AddMember = ({ open = false, onCancel }) => {
    const { setNotificationMessage } = useContext(HomeContext);
    const { setAddMember } = useContext(ModalContext);
    const { team, doAddMembersToTeam } = useContext(TeamContext);
    const { members, allMembers, doGetMembers, setAllMembers,doGetTeamMembers } = useContext(MemberContext);

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

    const addMember = data => {
        if (!mems.length) return;

        if (team) {
            const payload = {
                members: mems.map(mem => {
                    return {
                        memberId: mem.id,
                        role: data[`teamRole${mem.id}`]
                    }
                })
            }

          doAddMembersToTeam(team._id, payload, () => {
                reset();
                setAddMember(false);
                setMems([]);
                doGetTeamMembers({
                    teamId: team._id,
                    page: 0,
                    limit: MEMBER_PAGE_SIZE,
                    isSearching: true
                  });
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
                getValues={getValues}
            />
        </Modal>
    )
};
