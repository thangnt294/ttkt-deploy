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
import {ADMIN, MEMBER, ORGANIZATION, OWNER, removeMember, TEAM} from 'actions';
import {useLocation, useParams} from "react-router-dom";

export const MemberSettings = ({ open = false, onCancel }) => {
    const { userOrg, userInfo } = useContext(AuthContext);
    const { setNotificationMessage } = useContext(HomeContext);
    const { setMemberSettings, changeOwner, setChangeOwner, removeMemberFromTeam, setRemoveMemberFromTeam } = useContext(ModalContext);
    const { team, userTeamRole, doUpdateMemberRole, doRemoveMemberFromTeam } = useContext(TeamContext);
    const { member, doUpdateMember } = useContext(MemberContext);

    const { handleSubmit, register, errors, formState } = useForm();
    const [tempPayload, setTempPayload] = useState();

    const location = useLocation();
    const pathname = location.pathname.split("/")
    const teamId = pathname[pathname.length - 1]

    const updateMember = payload => doUpdateMemberRole(teamId, payload, () => {
        setMemberSettings(false);
        setNotificationMessage(`
            <p>Member settings updated successfully!</p>
        `)
    })

    const handleUpdateMember = data => {
      const memberRole = currentTeam.role;
      const payload = {
        memberId: member._id,
        role: data[`teamRole${teamId}`]
      }
      if (memberRole.toUpperCase() === 'OWNER' && data[`teamRole${teamId}`] === 'OWNER') {
        setTempPayload(payload)
        setChangeOwner(true)
      } else {
        updateMember(payload);
      }
    }

    const confirmUpdateMember = () => {
        if (!tempPayload) return;
        setChangeOwner(false);
        updateMember(tempPayload);
    }

  const confirmRemoveMember = () => {
    setRemoveMemberFromTeam(false);
    doRemoveMemberFromTeam(teamId, {
      memberIds: [member._id]
    });
  }

  const currentTeam = member?.teams?.find(team => team._id.toString() === teamId);

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
                {currentTeam && (
                    <RoleList
                        title="Team"
                        note="Change role in team"
                        items={[{
                          id: currentTeam._id,
                          title: currentTeam.name,
                          role: currentTeam.role,
                          disabled: currentTeam.role === 'MEMBER',
                          options: getRoleList()
                        }]}
                        register={register}
                        errors={errors}
                        onRemove={() => setRemoveMemberFromTeam(true)}
                    /> 
                )}
            </Modal>
            <DeleteConfirmation
                open={changeOwner}
                onCancel={() => setChangeOwner(false)}
                onSubmit={confirmUpdateMember}
                title="Change role"
                message={`You are making ${member ? member.name : ''} the owner of your team. Your role will be changed to admin. Do you want to continue?`}
            />
            <DeleteConfirmation
              open={removeMemberFromTeam}
              onCancel={() => setRemoveMemberFromTeam(false)}
              onSubmit={confirmRemoveMember}
              title="Change role"
              message={`Are you sure you want to remove ${member ? member.name : ''} from this team?`}
            />
        </>
    )
};
