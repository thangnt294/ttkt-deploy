import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Radio = ({ className = '', name, icon, value, checked = false, label, buttonMode = false, onChange, refs }) => {
    return (
        <label className={`tr__form-radio ${className} ${buttonMode ? 'button-mode' : ''}`}>
            <input
                type='radio'
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                ref={refs}
            />  
            <span>
                {icon && (
                    <i className={icon} />
                )}
                <span>{label}</span>
            </span>
        </label>
    );
};

Radio.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    buttonMode: PropTypes.bool,
    onChange: PropTypes.func,
    icon: PropTypes.string
};