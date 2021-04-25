import React, { useContext } from 'react';
import { HomeContext, ModalContext } from 'contexts';
import {
    AddTeam,
    AddMember,
    AddTask,
    EditTask,
    MemberSettings,
    Spinner,
    Notification,
} from 'components';

export const Modals = () => {
    const {
            addTeam,
            addMember,
            memberSettings,
            addTask,
            editTask,
            notification,
            setAddTeam,
            setAddMember,
            setMemberSettings,
            setAddTask,
            setEditTask,
            setNotification,
        } = useContext(ModalContext);
        const {
            loading,
            notificationMessage,
            notificationDuration,
            notificationType,
            setIsTemplate,
            setTeamMember,
            setIsEditTask,
            setNotificationMessage
        } = useContext(HomeContext);
    
    return (
        <>
            <AddTeam
                open={addTeam}
                onCancel={() => setAddTeam(false)}
            />
            <AddMember
                open={addMember}
                onCancel={() => {
                    setAddMember(false);
                    setTeamMember(false);
                }}
            />
            <MemberSettings
                open={memberSettings}
                onCancel={() => setMemberSettings(false)}
            />

            <AddTask
                open={addTask}
                onCancel={() => {
                    setAddTask(false);
                    setIsTemplate(false);
                    setIsEditTask(false);
                }}
            />
            <EditTask
                open={editTask}
                onCancel={() => setEditTask(false)}
            />

            <Notification
                open={notification}
                type={notificationType}
                onCancel={() => {
                    setNotification(false);
                    setNotificationMessage('');
                }}
                notificationMessage={notificationMessage}
                duration={notificationDuration}
            />

            {loading && (
                <Spinner type="transparent" />
            )}
        </>
    );
};
