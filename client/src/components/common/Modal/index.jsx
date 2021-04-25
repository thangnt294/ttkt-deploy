import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Button } from 'components';
import { toggleModalBodyClass } from 'utils';
import { clearTimeout } from 'timers';

export const Modal = ({
    className = '',
    title = '',
    open = false,
    notify = false,
    type = 'modal',
    onCancel,
    isBackDropClickable = true,
    submitButton,
    btnClasses = 'justify-content-end',
    submitButtonLabel = 'Submit',
    submitButtonType = 'primary',
    submitButtonClassNames = '',
    onSubmitClick,
    submitButtonDisabled = false,
    cancelButtonDisabled = false,
    cancelButton,
    cancelButtonLabel = 'Cancel',
    cancelButtonType = 'secondary',
    cancelButtonClassNames = '',
    footerLabel = '',
    onCancelClick,
    isNotification = false,
    renderForm = children => {
        return children;
    },
    children 
}) => {
    const [fadeIn, setFadeIn] = useState(false);

    let timeout = null;

    /*eslint-disable */
    useEffect(() => {
        if (!notify && !isNotification) toggleModalBodyClass(open, type === 'panel');
        if (open) {
            timeout = setTimeout(() => setFadeIn(true), 0);
        } else {
            clearTimeout(timeout);
            setFadeIn(false);
        }
    }, [open]);
    /*eslint-enable */

    const handleClickMask = e => {
        if (isBackDropClickable && e.target === e.currentTarget) onCancel();
    }

    return open ? (
        <div className={`tr__modal ${title ? 'has-title' : ''} ${className} ${fadeIn ? '' : 'hidden'} ${notify ? 'notify' : ''} ${type}`}>
            {!notify && !isNotification && (
                <div className='tr__modal--mask'></div>
            )}

            <div className="tr__modal--wrapper" onClick={handleClickMask}>
                <div className="tr__modal--content">
                    {title && !isNotification && (
                        <>
                            <div className="tr__modal--content__title">
                                <p>{title}</p>
                            </div>
                            <span className="tr__clickable tr__modal--close" onClick={onCancel}>
                                <i className="icon-times" />
                            </span>
                        </>
                    )}
                    {renderForm(
                        <>
                            <div className={`tr__modal--content--wrapper ${notify ? ' d-flex align-center' : ''}`}>
                                {children}
                            </div>
                            {(submitButton || cancelButton) && !isNotification && (
                                <div className={`tr__modal--content__footer d-flex align-items-center ${btnClasses}`}>
                                    {footerLabel && (
                                        <p>{footerLabel}</p>
                                    )}
                                    {cancelButton && (
                                        <Button
                                            type={cancelButtonType}
                                            className={cancelButtonClassNames}
                                            onClick={onCancelClick}
                                            disabled={cancelButtonDisabled}
                                        >
                                            {cancelButtonLabel}
                                        </Button>
                                    )}
                                    {submitButton && (
                                        <Button
                                            type={submitButtonType}
                                            className={submitButtonClassNames}
                                            onClick={onSubmitClick}
                                            isSubmitBtn={true}
                                            disabled={submitButtonDisabled}
                                        >
                                            {submitButtonLabel}
                                        </Button>
                                    )}
                                </div>
                            )}    
                        </>
                    )}
                </div>
            </div>
        </div>
    ) : '';
};

Modal.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['panel', 'modal']),
    open: PropTypes.bool,
    onCancel: PropTypes.func,
    isBackDropClickable: PropTypes.bool,
    btnClasses: PropTypes.string,
    notify: PropTypes.bool,
    submitButton: PropTypes.bool,
    submitButtonLabel: PropTypes.string,
    submitButtonType: PropTypes.string,
    submitButtonClassNames: PropTypes.string,
    onSubmitClick: PropTypes.func,
    cancelButton: PropTypes.bool,
    cancelButtonLabel: PropTypes.string,
    cancelButtonType: PropTypes.string,
    cancelButtonClassNames: PropTypes.string,
    onCancelClick: PropTypes.func,
    footerLabel: PropTypes.string,
    renderForm: PropTypes.func,
    isNotification: PropTypes.bool,
    submitButtonDisabled: PropTypes.bool,
    cancelButtonDisabled: PropTypes.bool
};