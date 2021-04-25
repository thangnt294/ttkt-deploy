import React from 'react';
import PropTypes from 'prop-types';

import {
    Modal,
} from 'components';

export const DeleteConfirmation = ({
    open = false,
    onCancel,
    onSubmit = () => {},
    title = 'Delete Confirmation',
    message = '',
    ...rest
}) => {
    return (
        <Modal
            open={open}
            className="tr__delete-confirmation"
            onCancel={onCancel}
            title={title}
            btnClasses="justify-content-center"
            submitButton
            submitButtonLabel="Yes"
            onSubmitClick={onSubmit}
            cancelButton={true}
            cancelButtonLabel="No"
            cancelButtonClassNames="outline secondary"
            onCancelClick={onCancel}
            isBackDropClickable={false}
            {...rest}
        >
            <div className="text-center delete-message">
                <h6 className="h6 mtbx2 f-medium">{message}</h6>
            </div>
        </Modal>
    )
};

DeleteConfirmation.propTypes = {
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string
};