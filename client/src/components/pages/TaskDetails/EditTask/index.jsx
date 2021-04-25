import React from 'react';

import './index.scss';
import {
    Modal,
    DeleteBlock,
    TaskDetails,
    AddDueDate
} from 'components';

export const EditTask = ({ open = false, onCancel }) => {
    return (
        <Modal
            open={open}
            className="tr__edit-task"
            onCancel={onCancel}
            title="Edit task"
            submitButton
            submitButtonLabel="Save task"
            footerLabel="We will invite all new assignee on behalf of you"
            isBackDropClickable={false}
        >
            <TaskDetails title="Task details" />
            <AddDueDate title="Add due date" />
            <DeleteBlock
                type="column"
                label="Delete this task"
                description="Once deleted, it will be gone forever. Please be certain."
                buttonLeftLabel="Delete task"
                onLeftBtnClick={() => console.log('Delete task')}
            />
        </Modal>
    )
};
