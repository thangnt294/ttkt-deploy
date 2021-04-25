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
    const [orgTeam, setOrgTeam] = useState(null);
    const [tempPayload, setTempPayload] = useState();

    useEffect(() => {
        if (team && team.organization && member) {
            setOrgTeam(member.orgTeams ? member.orgTeams.find(org => org.orgId === team.organization._id) : null);
        }
    }, [team, member])

    const getMemberTeams = () => {
        if (orgTeam && team) return orgTeam.teams.filter(t => t.teamId === team._id);
        const teamOrgs = team && member && member.orgTeams ? member.orgTeams.filter(org => org.teams.some(t => t.teamId === team._id)) : []
        return (teamOrgs.length > 0 && team ? teamOrgs[0].teams : []);
    }

    const updateMember = payload => doUpdateMember(payload, () => {
        setMemberSettings(false);
        setNotificationMessage(`
            <p>Member settings updated successfully!</p>
        `)
    })

    const handleUpdateMember = data => {
        const memberTeams = getMemberTeams();
        const payload = {
            memId: member._id
        }
        
        if (memberTeams.length > 0) {
            payload.teamRoles = memberTeams.map(team => {
                return {
                    teamId: team.teamId,
                    roleName: data[`teamRole${team.teamId}`]
                }
            })
        }

        if (team) {
            const { _id } = team.organization;
            // const orgRole = orgTeam ? orgTeam.roleName : '';

            payload.orgId = _id
            // payload.orgRole = orgRole;
            payload.type = TEAM;
        }
        
        if (payload.orgRole && getRole(payload.orgRole) === OWNER && userInfo._id !== payload.memId) {
            setTempPayload(payload);
            setChangeOwner(true);
        } else {
            updateMember(payload);
        }
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
                {getMemberTeams().length > 0 && (
                    <RoleList
                        title="Teams"
                        note="Change role in teams"
                        items={getMemberTeams().map(team => {
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
