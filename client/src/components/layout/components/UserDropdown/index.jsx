import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const UserDropdown = ({ options = [], onChange }) => {
    return (
        <div className="tr__user-dropdown">
            {options.map((option, optionIndex) => (
                <div
                    className="tr__user-dropdown--item d-flex align-items-center"
                    key={optionIndex}
                    onClick={() => onChange(option)}
                >
                    <i className={`${option.icon} mrx2`} />
                    <p>{option.value}</p>
                </div>
            ))}
        </div>
    )
};

UserDropdown.propTypes = {
    options: PropTypes.array,
    onChange: PropTypes.func
};