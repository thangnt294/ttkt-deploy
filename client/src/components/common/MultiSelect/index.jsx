import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Dropdown } from 'components';

export const MultiSelect = ({
    className = '',
    mode = 'inline',
    name,
    options = [],
    label,
    labelIcon,
    icon,
    value = [],
    placeholder,
    onChange,
    onInputChange = () => {},
    onAddItem = () => {},
    renderList,
    isSelectable = false,
    searchLoading = false,
    addButton,
    addButtonLabel,
    disabled,
    register = () => {},
    errors = [],
    formState,
    errorMessage = `Please choose to add at lease 1 member`,
    single = false,
    multiple = false
}) => {
    const [tempValues, setTempValues] = useState(value);

    /*eslint-disable */
    useEffect(() => {
        if (value && value.length > 0 && (single || multiple)) setTempValues(value);
    }, [value, single, multiple])
    /*eslint-enable */

    const handleAdd = item => {
        const newValues = [...tempValues, item]
        setTempValues(newValues);

        if (isSelectable) {
            onChange(newValues);
        } else {
            onAddItem();
        }
    }

    const handleRemove = item => {
        const newValues = tempValues.filter(val => val.id !== item.id);
        setTempValues(newValues);
        if (isSelectable) {
            onChange(newValues);
        }
    }

    const addButtonClick = e => {
        e.stopPropagation();
        if (onChange) {
            onChange(tempValues);

            setTempValues([]);
        }
    }

    const filteredArray = () => {
        return options.filter(value => !tempValues.find(temp => temp.id === value.id));
    }

    return (
        <div className={`tr__multiselect ${className} ${addButton ? '' : 'no-add-btn'} ${errors[name] ? 'error' : ''}`}>
            {label && (
                <label htmlFor={name} className="mbx2">
                    {labelIcon && (
                        <i className={labelIcon} />
                    )}
                    <span className="h2 f-medium">{label}</span>
                </label>
            )}

            <div className="tr__multiselect--wrapper">
                <Dropdown
                    icon={icon}
                    iconPosition="right"
                    mode="multiselect"
                    type={mode}
                    value={tempValues}
                    options={filteredArray()}
                    addedValues={value}
                    defaultValue={value && value[0] ? value[0].id : null}
                    name={name}
                    placeholder={placeholder}
                    dropdownPosition="center"
                    onRemove={handleRemove}
                    onChange={addButton || isSelectable ? handleAdd : item => item && onChange([item])}
                    onInputChange={onInputChange}
                    addButton={addButton}
                    addButtonLabel={addButtonLabel}
                    addButtonClick={addButtonClick}
                    searchLoading={searchLoading}
                    refs={register}
                    error={formState && formState.submitCount > 1 ? ((!!errors[name] && value.length === 0) || value.length === 0) : false}
                    errorMessage={errorMessage}
                    disabled={disabled}
                    single={single}
                />
                {renderList && renderList(value)}
            </div>
        </div>
    )
};

MultiSelect.propTypes = {
    className: PropTypes.string,
    mode: PropTypes.oneOf(['inline', 'list']),
    name: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func,
    label: PropTypes.string,
    labelIcon: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    renderList: PropTypes.func,
    addButton: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    isSelectable: PropTypes.bool,
    onInputChange: PropTypes.func,
    onAddItem: PropTypes.func,
    searchLoading: PropTypes.bool,
    register: PropTypes.func,
    errors: PropTypes.any,
    formState: PropTypes.any,
    disabled: PropTypes.bool,
    single: PropTypes.bool
};
