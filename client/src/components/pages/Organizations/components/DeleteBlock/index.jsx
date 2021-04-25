import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Button } from 'components';

export const DeleteBlock = ({
    type,
    buttonLeftLabel,
    buttonRightLabel,
    onLeftBtnClick = () => {},
    onRightBtnClick = () => {},
    isEdit = true,
    onSubmit,
    showMessage = false,
    icon='',
    typeBtn ='',
    className='',
    setIsEdit = () => {},
    onCancel = () => {}
}) => {
    return isEdit ? (
        <div className={`tr__details-form__remove align-items-center text-right ${type}`}>
            <div className="tr__details-form__remove--left">
                <p
                    className="tr__link secondary mrx2"
                    onClick={() => {
                        setIsEdit(false);
                        onCancel();
                    }}
                >
                    Cancel
                </p>
                <Button
                    className="w-100"
                    onClick={onSubmit}
                    isSubmitBtn={true}
                >
                    Save Changes
                </Button>
            </div>
        </div>
    ) : (
        <div className={`tr__details-form__remove d-flex align-items-center justify-content-between ${type}`}>
            <div className="tr__details-form__remove--left">
                {buttonLeftLabel && (
                    <Button
                        className="w-100"
                        type="danger"
                        onClick={onLeftBtnClick}
                    >
                        {buttonLeftLabel}
                    </Button>
                )}
                {showMessage && <span className="mlx2 message">All teams and members must be removed and associated shipments must be completed/cancelled</span>}
            </div>
            <div>
                {buttonRightLabel && (
                    <Button
                        className={className}
                        icon={icon}
                        type={typeBtn}
                        isSubmitBtn={true}
                        onClick={onRightBtnClick}
                    >
                        {buttonRightLabel}
                    </Button>
                )}
            </div>
        </div>
    )
};

DeleteBlock.propTypes = {
    type: PropTypes.oneOf(['column']),
    description: PropTypes.string,
    label: PropTypes.string,
    onLeftBtnClick: PropTypes.func,
    onRightBtnClick: PropTypes.func,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func,
    setIsEdit: PropTypes.func,
    onCancel: PropTypes.func
}