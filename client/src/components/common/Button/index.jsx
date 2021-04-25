import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Button = ({
    className = '',
    icon,
    type = 'primary',
    loading = false,
    disabled = false,
    onClick,
    isSubmitBtn = false,
    children
}) => {
    return (
        <button
            type={isSubmitBtn ? 'submit' : 'button'}
            className={`tr__button ${type} ${className} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
            onClick={onClick}
        >
            {icon && (
                <i className={icon} />
            )}
            {children && (
                <span>{ children }</span>
            )}
        </button>
    )
};

Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'info', 'outline']),
    className: PropTypes.string,
    icon: PropTypes.string,
    iconMode: PropTypes.any,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    isSubmitBtn: PropTypes.bool
}