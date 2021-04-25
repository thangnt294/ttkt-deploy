import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { AuthContext, HomeContext, MemberContext, ModalContext, UploadFileContext } from 'contexts';
import {
    DeleteBlock,
    OganizationsInfo,
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

const PersonalSetting = () => {
    const history = useHistory();
    const { userInfo, loggedInUser } = useContext(AuthContext);
    const { setNotificationMessage } = useContext(HomeContext);
    const {
        leaveOwnerOrg,
        leaveOrg,
        leaveTeam,
        deleteMe,
        setDeleteMe,
        deleteMeOwner,
        setDeleteMeOwner,
        setLeaveOwnerOrg,
        setLeaveOrg,
        setLeaveTeam
    } = useContext(ModalContext);
    const { doGetMember, doDeleteMe, member, doUpdatePersonalSettings, doLeaveOrgsTeams } = useContext(MemberContext);
    const { doUploadFile } = useContext(UploadFileContext);

    const { handleSubmit, register, errors, reset } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [tempMember, setTempMember] = useState();
    const [tempPayload, setTempPayload] = useState();
    const [current, setCurrent] = useState();
    const [avatar, setAvatar] = useState(null);

    /*eslint-disable */
    useEffect(() => {
        if (member) {
            setTempMember(member);
        }
    }, [member])

    useEffect(() => {
        if ((userInfo && !member) || (userInfo && member && member._id !== userInfo._id)) {
            const { _id } = userInfo;
            doGetMember(_id);
        }
    }, [userInfo, member])

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
            fullName
        } = data;
        const contactNumber = tempMember.contactNumber && tempMember.contactNumber.length > 0
            ? tempMember.contactNumber.map((mem, memIndex) => data[`phoneNumber${memIndex}`])
            : [];
        const primaryNumber = contactNumber && contactNumber.length > 0
            ? contactNumber.find((mem, memIndex) => {
                return data[`primaryNumber${memIndex}`];
            })
            : null;

        let avatarId = member.avatar;
        let avatarUrl = null;
        
        /**
         * Upload new avatar if have change...
         */
        if (avatar) {
            const uploadedAvatar = await doUploadFile({
                type: FILE_TYPE_USER_FILES,
                subType: FILE_SUBTYPE_USER_AVATAR,
                fileName: `avatar_${member._id}_${getUnixTimestamp()}`,
                fileExtension: getMimeFileExtension(getBase64Mime(avatar)),
            }, avatar, loggedInUser);

            avatarId = uploadedAvatar.id;
            avatarUrl = uploadedAvatar.url;
        }

        const payload = {
            name: fullName,
            email: member.email,
            contactNumber,
            avatar: avatarId,
            avatarUrl,
        }

        if (primaryNumber) {
            payload.primaryContactNumber = primaryNumber
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

    const getSelectedTeam = teamId => {
        let selectedTeam = null;
        if (userInfo && userInfo.orgTeams) {
            for (let i = 0; i < userInfo.orgTeams.length; i++) {
                for (let j = 0; j < userInfo.orgTeams[i].teams.length; j++) {
                    if (userInfo.orgTeams[i].teams[j].teamId === teamId) {
                        selectedTeam = userInfo.orgTeams[i].teams[j];
                        break;
                    }
                }
            }
        }
        return selectedTeam;
    }

    const handleLeave = payload => {
        let newPayload = {};
        const { teamIds, orgIds } = payload;
        setTempPayload(payload);
        if (teamIds && teamIds.length > 0) {
            newPayload.teamIds = teamIds;
            setCurrent(getSelectedTeam(teamIds[0]));
            setLeaveTeam(true);
        }
        if (orgIds && orgIds.length > 0) {
            newPayload.orgIds = orgIds;
            if (isOwnerRole(orgIds[0])) setLeaveOwnerOrg(true);
            else setLeaveOrg(true);
        }
    }

    const handleConfirmLeave = () => {
        if (tempPayload) {
            const { teamNames, orgNames } = tempPayload;
            doLeaveOrgsTeams(tempPayload, () => {
                setLeaveTeam(false);
                setLeaveOrg(false);
                setNotificationMessage(`
                    <p>You've left ${teamNames ? `${teamNames[0]} team` : `${orgNames[0]} organization`} successfully!</p>
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
                        member={tempMember}
                        setMember={setTempMember}
                        setAvatar={setAvatar}
                    />
                    <OganizationsInfo
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
                message="Please transfer your organization ownership or delete your organization before deleting your own account."
            />
            <DeleteConfirmation
                open={leaveOwnerOrg}
                onCancel={() => setLeaveOwnerOrg(false)}
                submitButton={false}
                title={`Leave ${current ? current.orgName : ''}`}
                cancelButtonLabel="OK"
                cancelButtonClassNames="primary"
                message="Please transfer your organization ownership before leaving your organization."
            />
            <DeleteConfirmation
                open={leaveOrg}
                onCancel={() => setLeaveOrg(false)}
                title={`Leave ${current ? current.orgName : ''}`}
                submitButtonLabel="Confirm"
                cancelButtonLabel="Cancel"
                onSubmit={handleConfirmLeave}
                message="Once leave the organization, you will be removed from related collaborator list, assigned tasks and shipment issues. Are you sure you want to leave?"
            />
            <DeleteConfirmation
                open={leaveTeam}
                onCancel={() => setLeaveTeam(false)}
                title={`Leave ${current ? current.teamName : ''}`}
                submitButtonLabel="Confirm"
                cancelButtonLabel="Cancel"
                onSubmit={handleConfirmLeave}
                message="Once leave the organization, you will be removed from related collaborator list, assigned tasks and shipment issues. Are you sure you want to leave?"
            />
        </form>
    )
};

export default PersonalSetting;

