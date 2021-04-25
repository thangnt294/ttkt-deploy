import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Checkbox } from 'components';

export const CheckboxGroup = ({ className = '', name, values, singleValue = false, label, vertical, buttonMode = false, horizontal, items = [], onChange, refs, error, errorMessage }) => {

    const handleCheckboxChange = item => {
        let checkedValues = [];
        const isExist = values.some(v => v.id === item.id);
        if (singleValue) {
            if (isExist) checkedValues = [...values]
            else checkedValues = [item]
        } else {
            if (isExist) checkedValues = values.filter(v => v.id !== item.id);
            else checkedValues = [
                ...values,
                item
            ];
        }

        onChange(checkedValues);
    }

    const getDisabledState = id => {
        if (!values || (values && !values.length)) return false;
        const selectedValue = values.find(v => v.id === id);
        return selectedValue ? selectedValue.disabled : false;
    }
    

    return items.length > 0 ? (
        <div className={`tr__checkbox-group--wrapper ${className}`}>
            {label && (
                <label className="d-block f-medium mbx1">{label}</label>
            )}
            <div className={`tr__checkbox-group ${vertical ? 'vertical' : ''} ${horizontal ? 'horizontal' : ''}`}>
                {items.map((item, itemIndex) => (
                    <Checkbox
                        key={itemIndex}
                        name={name}
                        type='checkbox'
                        icon={buttonMode ? item.icon : null}
                        value={item.id}
                        refs={refs}
                        label={item.name}
                        checked={values && values.length > 0 && values.some(v => v.id === item.id)}
                        buttonMode={buttonMode}
                        onChange={() => handleCheckboxChange(item)}
                        disabled={getDisabledState(item.id)}
                    />
                ))}
            </div>
            <p className={`error ${error && errorMessage && 'active'}`}>{errorMessage}</p>
        </div>
    ) : null;
};

CheckboxGroup.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    items: PropTypes.array,
    name: PropTypes.string,
    vertical: PropTypes.any,
    horizontal: PropTypes.any,
    values: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    buttonMode: PropTypes.bool,
    singleValue: PropTypes.bool
}