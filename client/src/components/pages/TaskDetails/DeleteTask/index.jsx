import React, { useContext } from 'react';

import {
    Modal,
} from 'components';
import { HomeContext, ModalContext } from 'contexts';
import { useLocation } from 'react-router-dom';
import { ALL, MYTASK } from 'actions';

export const DeleteTask = ({ open = false, onCancel }) => {
    const { eventTask, setNotificationMessage, setIsEditTask, currentTabManagement, isTemplate, setIsTemplate } = useContext(HomeContext);
    const { setDeleteTask } = useContext(ModalContext);
    const location = useLocation();
    const pathnameArr = location.pathname.split('/');
    const shipmentId = pathnameArr[pathnameArr.length - 1];
    
    const handleDeleteTask = () => {
    }
    return (
        <Modal
            open={open}
            className="tr__edit-section"
            onCancel={onCancel}
            title="Delete Task"
            btnClasses="justify-content-center"
            submitButton
            submitButtonLabel="Yes"
            onSubmitClick={handleDeleteTask}
            cancelButton={true}
            cancelButtonLabel="No"
            cancelButtonType=""
            cancelButtonClassNames="outline secondary"
            onCancelClick={onCancel}
            isBackDropClickable={false}
        >
            <div className="text-center">
                <h6 className="h6 mtbx4 f-medium">Are you sure you want to delete this task?</h6>
            </div>
        </Modal>
    )
};
