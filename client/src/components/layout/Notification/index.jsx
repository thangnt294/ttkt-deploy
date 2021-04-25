import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {
    Modal
} from 'components';
import { SUCCESS } from 'actions';

export const Notification = ({
    open = false,
    type = SUCCESS,
    notificationMessage = '',
    duration,
    onCancel
}) => {
    let timeout;
    /*eslint-disable */
    useEffect(() => {
        if (open && duration && duration > 0) {
            timeout = setTimeout(() => {
                onCancel();
            }, duration);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [duration, open]);
    /*eslint-enable */

    return (
        <Modal
            open={open}
            className={`tr__notification ${type}`}
            onCancel={onCancel}
            isBackDropClickable={false}
            isNotification={true}
        >
            <div dangerouslySetInnerHTML={{ __html: notificationMessage }} className="text-center"></div>
        </Modal>
    )
};

Notification.propTypes = {
    open: PropTypes.bool,
    type: PropTypes.string,
    notificationMessage: PropTypes.string,
    onCancel: PropTypes.func,
    duration: PropTypes.number
};