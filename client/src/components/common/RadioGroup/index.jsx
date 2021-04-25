import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Radio } from 'components';

export const RadioGroup = ({
    className = '',
    name,
    value,
    label,
    type = 'buttons',
    disabled = false,
    buttonMode = true,
    vertical,
    horizontal,
    items = [],
    onChange,
    description,
    refs = () => {}
}) => {
    return items.length > 0 ? (
        <div className={`tr__radio-group--wrapper ${className}`}>
            {label && (
                <label className="d-block f-medium mbx1">{label}</label>
            )}
            {description && (
                <p className="mbx3">{description}</p>
            )}
            <div className={`tr__radio-group ${vertical ? 'vertical' : ''} ${horizontal ? 'horizontal' : ''} ${disabled ? 'disabled' : ''}`}>
                {items.map((item, itemIndex) => (
                    <Radio
                        key={itemIndex}
                        name={name}
                        value={item.id}
                        icon={item.icon}
                        label={item.name}
                        buttonMode={buttonMode}
                        refs={refs}
                        checked={value && (value.id === item.id)}
                        onChange={disabled ? () => {} : () => onChange(item)}
                        className={type}
                    />
                ))}
            </div>
        </div>
    ) : null;
};

RadioGroup.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    items: PropTypes.array,
    name: PropTypes.string,
    vertical: PropTypes.any,
    horizontal: PropTypes.any,
    value: PropTypes.object,
    onChange: PropTypes.func,
    buttonMode: PropTypes.bool,
    refs: PropTypes.func,
    type: PropTypes.oneOf(['buttons', 'choices', 'default']),
    disabled: PropTypes.bool
}