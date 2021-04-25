import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Checkbox = ({
    className = '',
    name,
    type = 'checkbox',
    icon,
    value,
    refs,
    checked = false,
    buttonMode = false,
    label,
    onChange,
    disabled = false,
}) => {
    return (
        <label className={`tr__form-checkbox ${className} ${buttonMode ? 'button-mode' : ''}`} onClick={e => e.stopPropagation()}>
            <input
                type={type}
                name={name}
                value={value}
                ref={refs}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />  
            <span>
                {icon ? (
                    <i className={icon} />
                ) : (
                    <i className="icon-check" />
                )}
                <span>{label}</span>
            </span>
        </label>
    );
};

Checkbox.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    icon: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    buttonMode: PropTypes.bool,
};