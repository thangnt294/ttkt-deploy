import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { AuthContext, HomeContext, MemberContext, ModalContext, UploadFileContext } from 'contexts';
import {
    DeleteBlock,
    UserInfo,
    DeleteConfirmation
} from 'components';
import {
    getRole,
    removeAll,
    getBase64Mime,
    getMimeFileExtension,
    getUnixTimestamp,
} from 'utils';
import { LOGIN_URL, OWNER, FILE_SUBTYPE_USER_AVATAR, FILE_TYPE_USER_FILES } from 'actions';
import {TeamsInfo} from "../../../components";

const PersonalSetting = () => {
    const history = useHistory();
    const { userInfo, loggedInUser } = useContext(AuthContext);
    const { setNotificationMessage } = useContext(HomeContext);
    const {
        leaveTeam,
        deleteMe,
        setDeleteMe,
        deleteMeOwner,
        setDeleteMeOwner,
        setLeaveOwnerOrg,
        setLeaveOrg,
        setLeaveTeam
    } = useContext(ModalContext);
    const { doGetMember, doDeleteMe, member, doUpdatePersonalSettings, doLeaveTeam } = useContext(MemberContext);
    const { doUploadFile } = useContext(UploadFileContext);

    const { handleSubmit, register, errors, reset } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [tempMember, setTempMember] = useState(member);
    const [tempPayload, setTempPayload] = useState();
    const [current, setCurrent] = useState();
    const [avatar, setAvatar] = useState(null);

    /*eslint-disable */
    useEffect(() => {
      const { _id } = userInfo;
      doGetMember(_id);
    }, [])

    useEffect(() => {
        if (!isEdit && member) {
            reset();
            setTempMember(member);
        }
    }, [isEdit, member])
    /*eslint-enable */

    const handleDeleteMe = () => {
        doDeleteMe(() => {
            removeAll();
            history.push(LOGIN_URL);
            setDeleteMe(false);
        }, setDeleteMe(false));
    }

    const handleUpdatePersonalSettings = async data => {
        if (!isEdit) return;
        const {
            name
        } = data;
        let avatarId = member.avatar;
        let avatarUrl = null;
        
        /**
         * Upload new avatar if have change...
         */
        // if (avatar) {
        //     const uploadedAvatar = await doUploadFile({
        //         type: FILE_TYPE_USER_FILES,
        //         subType: FILE_SUBTYPE_USER_AVATAR,
        //         fileName: `avatar_${member._id}_${getUnixTimestamp()}`,
        //         fileExtension: getMimeFileExtension(getBase64Mime(avatar)),
        //     }, avatar, loggedInUser);
        //
        //     avatarId = uploadedAvatar.id;
        //     avatarUrl = uploadedAvatar.url;
        // }

        const payload = {
            name: name,
            email: member.email
        }

        doUpdatePersonalSettings(payload, () => {
            reset();
            setIsEdit(false);
            setNotificationMessage(`
                <p>Personal settings updated successfully!</p>
            `);
        });
    }

    const isOwnerRole = orgId => {
        const currentOrg = userInfo && userInfo.orgTeams ? userInfo.orgTeams.find(o => o.orgId === orgId) : null;
        setCurrent(currentOrg);
        return currentOrg ? getRole(currentOrg.roleName) === OWNER : false;
    }

    const handleLeave = (teamId, teamName) => {
        setTempPayload({
          teamId,
          teamName
        });
        setLeaveTeam(true);
    }

    const handleConfirmLeave = () => {
        if (tempPayload) {
            const { teamId, teamName } = tempPayload;
            doLeaveTeam(teamId, () => {
                setLeaveTeam(false);
                setNotificationMessage(`
                    <p>You've left ${teamName} team successfully!</p>
                `);
            })
        }
    }

    return (
        <form className="tr-personal-setting box page-box" onSubmit={handleSubmit(handleUpdatePersonalSettings)}>
            <h1 className="h1 f-medium mtx1 mbx3 d-flex align-items-center">
                {isEdit && (
                    <p className="tr__link tag mrx2" onClick={() => setIsEdit(false)}>
                        <i className="icon-chevron-left" />
                        <span>Back</span>
                    </p>
                )}
                <span>{isEdit ? 'Edit' : ''} Personal Settings</span>
            </h1>
            <div className="tr-personal-setting__card">
                <div className="user-details-form">
                    <UserInfo
                        isEdit={isEdit}
                        setIsEdit={setIsEdit}
                        register={register}
                        errors={errors}
                        member={userInfo}
                        setMember={setTempMember}
                        setAvatar={setAvatar}
                    />
                    <TeamsInfo
                        handleLeave={handleLeave}
                        isEdit={isEdit}
                    />
                </div>
            </div>
            <DeleteBlock
                typeBtn="danger"
                isEdit={isEdit}
                setIsEdit={val => setIsEdit(val)}
                buttonRightLabel="Delete Account"
                onRightBtnClick={isEdit ? null : () => {
                    setDeleteMe(true);
                }}
            />
            <DeleteConfirmation
                open={deleteMe}
                onCancel={() => setDeleteMe(false)}
                onSubmit={handleDeleteMe}
                title="Delete own account"
                message="Once deleted, all your information will be deleted. Are you sure you want to delete your account?"
                submitButtonLabel="Confirm"
                cancelButtonLabel="Cancel"
            />
            <DeleteConfirmation
                open={deleteMeOwner}
                onCancel={() => setDeleteMeOwner(false)}
                submitButton={false}
                cancelButtonLabel="OK"
                title="Delete own account"
                cancelButtonClassNames="primary"
                message="Please transfer your team ownerships or delete all your teams before deleting your own account."
            />
            <DeleteConfirmation
                open={leaveTeam}
                onCancel={() => setLeaveTeam(false)}
                title={`Leave ${current ? current.teamName : ''}`}
                submitButtonLabel="Confirm"
                cancelButtonLabel="Cancel"
                onSubmit={handleConfirmLeave}
                message="Once leave the team, you will be removed from related tasks. Are you sure you want to leave?"
            />
        </form>
    )
};

export default PersonalSetting;

