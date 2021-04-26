import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './index.scss';
import {
    AuthContext,
    HomeContext,
    MemberContext,
    ModalContext,
    TeamContext
} from 'contexts';
import {
    Modal,
    MemberDetails,
    RoleList,
    DeleteConfirmation
} from 'components';
import {
    getRole,
    getRoleList
} from 'utils';
import { ADMIN, MEMBER, ORGANIZATION, OWNER, TEAM } from 'actions';

export const MemberSettings = ({ open = false, onCancel }) => {
    const { userOrg, userInfo } = useContext(AuthContext);
    const { setNotificationMessage } = useContext(HomeContext);
    const { setMemberSettings, changeOwner, setChangeOwner } = useContext(ModalContext);
    const { team, userTeamRole } = useContext(TeamContext);
    const { member, doUpdateMember } = useContext(MemberContext);

    const { handleSubmit, register, errors, formState } = useForm();
    const [tempPayload, setTempPayload] = useState();

    const updateMember = payload => doUpdateMember(payload, () => {
        setMemberSettings(false);
        setNotificationMessage(`
            <p>Member settings updated successfully!</p>
        `)
    })

    const handleUpdateMember = data => {
        const memberTeams = member.teams;
        const payload = {
            memberId: member._id
        }
        
        if (memberTeams.length > 0) {
            payload.teamRoles = memberTeams.map(team => {
                return {
                    teamId: team.teamId,
                    roleName: data[`teamRole${team.teamId}`]
                }
            })
        }

        updateMember(payload);
    }

    const confirmUpdateMember = () => {
        if (!tempPayload) return;
        setChangeOwner(false);
        updateMember(tempPayload);
    }

    return (
        <>
            <Modal
                open={open}
                className="tr__member-settings no-padding"
                onCancel={onCancel}
                title="Member settings"
                submitButton
                submitButtonLabel="Save Changes"
                isBackDropClickable={false}
                btnClasses="justify-content-center"
                renderForm={children => (
                    <form onSubmit={handleSubmit(handleUpdateMember)}>
                        {children}
                    </form>
                )}
                submitButtonDisabled={!formState.isDirty}
            >
                <MemberDetails
                    title="User details"
                    member={member}
                />
                {member.teams.length > 0 && (
                    <RoleList
                        title="Teams"
                        note="Change role in teams"
                        items={member.teams.map(team => {
                            const currentUserInTeam = userOrg ? userOrg.teams.find(t => t.teamId === team.teamId) : null;
                            return {
                                id: team.teamId,
                                title: team.teamName,
                                role: getRole(team.roleName),
                                disabled: (!(currentUserInTeam && getRole(currentUserInTeam.roleName) !== MEMBER)) || (getRole(userTeamRole) === MEMBER && team),
                                options: true ? getRoleList(ADMIN) : (currentUserInTeam ? getRoleList(currentUserInTeam.roleName) : getRoleList(team.roleName, false))
                            }
                        })}
                        register={register}
                        errors={errors}
                    /> 
                )}
            </Modal>
            <DeleteConfirmation
                open={changeOwner}
                onCancel={() => setChangeOwner(false)}
                onSubmit={confirmUpdateMember}
                title="Change role"
                message={`You are making ${member ? member.name : ''} the owner of your organization. Your role will be changed to admin. Do you want to continue?`}
            />
        </>
    )
};
