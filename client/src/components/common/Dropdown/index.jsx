import React, { useState, useRef, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './index.scss';
import { Input, Button } from 'components';
// import {
//     addWindowScrollingEvent,
//     onDropdownShown
// } from 'utils';
import { DEBOUNCE_TIME } from 'actions';

const useOutsideAlerter = (ref, onClickOutside) => {
    let timeout = null;

    /*eslint-disable */
    useEffect(() => {
        const handleCLickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }

            const suggestions = document.querySelectorAll('.suggestions');
            timeout = setTimeout(() => {
                suggestions.forEach(s => {
                    s.style.display = 'none';
                })
            }, 250)
        }

        document.addEventListener('mousedown', handleCLickOutside);
        return () => {
            if (timeout) clearTimeout(timeout);
            document.removeEventListener('mousedown', handleCLickOutside);
        }
    }, [ref]);
    /*eslint-enable */
}

export const Dropdown = ({
    className = '',
    mode = 'select',
    type = 'inline',
    name,
    label,
    horizontalLabel,
    icon,
    iconPosition = 'right',
    options = [],
    value,
    onChange,
    onRemove,
    required = false,
    disabled = false,
    error,
    errorMessage,
    placeholder = 'Please choose an option',
    dropdownPosition = 'left',
    render,
    renderList,
    renderLabel,
    children,
    addButton = false,
    addButtonLabel,
    addButtonClick,
    refs,
    defaultValue,
    addedValues = [],
    onInputChange = () => {},
    searchLoading = false,
    single = false,
    comparable = false
}) => {
    const wrapperRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [tempSelectedText, setTempSelectedText] = useState('');
    const [arrValue, setArrValue] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    let inputRef = createRef();
    let hiddenInput = createRef();

    /*eslint-disable */
    useEffect(() => {
        triggerDirtyInput();
    }, [hiddenInput])

    // useEffect(() => {
    //     const currentDropdownElement = getDropdownElement();
    //     addWindowScrollingEvent(currentDropdownElement);
    // }, [])

    // useEffect(() => {
    //     const currentDropdownElement = getDropdownElement();
    //     onDropdownShown(currentDropdownElement);
    // }, [open])

    useEffect(() => {
        setSelectedValue(value);
        setTempSelectedText(value ? value.value : '');
    }, [value])

    useEffect(() => {
        if (addedValues.length > 0) {
            setArrValue(addedValues.map(v => v.id).join(','))
        }
    }, [addedValues])
    /*eslint-disable */

    useOutsideAlerter(wrapperRef, () => {
        setOpen(false);
    });

    const getDropdownElement = () => {
        return wrapperRef ? wrapperRef.current.querySelector('.tr__dropdown__items') : null;
    }

    const triggerDirtyInput = () => {
        let event = new Event('input', { bubbles: true });
        hiddenInput.dispatchEvent(event);
    }

    const handleChange = value => {
        if (value) {
            setIsDirty(false);
            setSelectedValue(value);

            triggerDirtyInput();

            if (inputRef && inputRef.current) {
                inputRef.current.value = value.value || '';
                inputRef.current.focus();
            }
        }
        setOpen(false);

        setTimeout(() => {
            if (onChange && value) {
                onChange(value);
            }
        }, 300);
    }

    const isInputMode = () => mode === 'input';
    const isIconMode = () => mode === 'icon';
    const isSelectMode = () => mode === 'select';
    const isMultiSelectMode = () => mode === 'multiselect';
    const isInlineMode = () => type === 'inline';
    const isListMode = () => type === 'list';
    const isFontIcon = () => typeof icon === 'string' && icon.indexOf('icon') > -1;
    const isImage = () => typeof icon === 'object' || (typeof icon === 'string' && icon.indexOf('base64') > -1);

    const handleRemove = item => {
        setOpen(false);

        setTimeout(() => {
            if (onRemove) onRemove(item);
        }, 300);
    }

    const handleOpen = value => {
        if (disabled) return;
        setOpen(value);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onInput = debounce(value => {
        setSelectedValue(null);
        setIsDirty(true);
        setOpen(true);
        onInputChange(value);
    }, DEBOUNCE_TIME)

    const handleBlur = () => {
        if(!selectedValue && isDirty){
            setSelectedValue(null);
            if (inputRef && inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }

    const handleFocus = (value) =>{
        if(options.length === 0 && !value){
            onInputChange(value);
        }
    }

    return (
        <div className={`tr__dropdown ${className} ${error && errorMessage && (isMultiSelectMode() || !selectedValue) ? 'error' : ''} ${open ? 'active' : ''} ${disabled ? 'disabled' : ''}`} ref={wrapperRef}>
            <input
                name={name}
                type="text"
                ref={ref => {
                    hiddenInput = ref;
                    if (refs) refs(ref);
                }}
                value={selectedValue
                    ? (selectedValue.length > 0
                        ? arrValue
                        : (selectedValue.length === 0 ? (defaultValue && !isDirty
                            ? (typeof defaultValue === 'object'
                                ? defaultValue.key
                                : defaultValue
                            )
                            : ''
                        ) : selectedValue.key))
                    : (defaultValue && !isDirty
                        ? (typeof defaultValue === 'object'
                            ? defaultValue.key
                            : defaultValue
                        )
                        : ''
                    )
                }
            />
            {label && (
                <label>{label}{required && (
                    <span>*</span>
                )}</label>
            )}
            {renderLabel ? (
                <div className={`tr__dropdown__label ${mode} ${iconPosition}`} onClick={() => handleOpen(!open)}>
                    {renderLabel(selectedValue)}

                    {icon && isFontIcon() && (
                        <i className={icon} />
                    )}

                    {icon && isImage() && (
                        <img src={icon} alt="Dropdown icon" />
                    )}
                </div>
            ) : (
                <>
                    {isSelectMode() && (
                        <p className={`tr__dropdown__label ${mode} ${iconPosition}`} onClick={() => handleOpen(!open)}>
                            {(selectedValue || defaultValue) ? (
                                <span className="selected">{selectedValue ? selectedValue.value : (defaultValue ? (typeof defaultValue === 'object' ? defaultValue.value : defaultValue) : '')}</span>
                            ) : (
                                <span className="placeholder">{placeholder}</span>
                            )}
                            {icon && isFontIcon() && !searchLoading ? (
                                <i className={icon} /> 
                            ) : ''}
                            <i className={`loading ${searchLoading ? 'active' : ''}`} />
                            {icon && isImage() && (
                                <img src={icon} alt="Dropdown icon" />
                            )}
                        </p>
                    )}
                    {isIconMode() && (
                        <div className={`tr__dropdown__label ${mode}`} onClick={() => handleOpen(!open)}>
                            { children }
                        </div>
                    )}
                    {isInputMode() && (
                        <div className={`tr__dropdown__label d-flex align-items-center ${mode}`} onClick={() => handleOpen(!open)}>
                            {horizontalLabel && (
                                <p className="horizontal-label">{horizontalLabel}</p>
                            )}
                            <Input
                                icon={icon}
                                iconPosition={iconPosition}
                                placeholder={placeholder}
                                defaultValue={tempSelectedText || (defaultValue && typeof defaultValue === 'object' ? defaultValue.value : defaultValue)}
                                onChange={e => onInput(e.target.value)}
                                loading={searchLoading}
                                error={error && !selectedValue}
                                refs={inputRef}
                                autoComplete="new-password"
                                onBlur={() => handleBlur()}
                                onFocus={(e) => handleFocus(e.target.value)}
                            />
                        </div>
                    )}
                    {isMultiSelectMode() && (
                        <div className={`tr__dropdown__label d-flex align-center ${mode} ${value && value.length > 0 ? 'active' : ''}`}>
                            <div className="tr__selected-values">
                                {isInlineMode() && value && value.length > 0 && value.map((val, valIndex) => (
                                    <div className="tr__selected-values--item" key={valIndex}>
                                        <h6 className="h6">{val.title || val.description || val.taskName || val.name}</h6>
                                        <i className="icon-times" onClick={() => handleRemove(val)} />
                                    </div>
                                ))}
                                <div className={`input-wrapper ${addButton ? 'd-flex justify-content-between' : ''}`} onClick={() => {
                                    if (!(single && value && value.length > 0)) {
                                        handleOpen(true)
                                    }
                                }}>
                                    <Input
                                        className={single && value && value.length > 0 ? 'hidden' : ''}
                                        icon={icon}
                                        iconPosition={iconPosition}
                                        placeholder={!isListMode() && value && value.length > 0 ? single ? '' : 'Add more...' : placeholder}
                                        onChange={e => onInput(e.target.value)}
                                        loading={searchLoading}
                                        error={error}
                                        refs={inputRef}
                                        autoComplete="new-password"
                                        onBlur={() => handleBlur()}
                                        onFocus={(e) => handleFocus(e.target.value)}
                                    />
                                    {addButton && (
                                        <Button
                                            disabled={!value.length}
                                            type={value.length ? 'primary' : 'secondary'}
                                            onClick={addButtonClick}
                                        >
                                            {addButtonLabel}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            {single && value.length === 1 ? (<div></div>) : (
                <div className={`tr__dropdown__items tr__selected-values ${dropdownPosition !== 'center' ? 'auto' : ''} ${dropdownPosition} ${open ? '' : 'hidden'}`}>
                {render ? render(options, handleChange, selectedValue, handleClose) : (options && options.length > 0 ? options.map((option, optionIndex) => (
                    <React.Fragment key={optionIndex}>
                        {isMultiSelectMode() ? (
                            <div
                                key={optionIndex}
                                className='tr__selected-values--item'
                                onClick={() => handleChange(option)}
                            >
                                {option.icon && (option.icon.indexOf('icon') > -1 ? (
                                    <i className={option.icon} />
                                ) : (
                                    <img src={option.icon} alt={option.title} />
                                ))}
                                <div className="info">
                                    {option.title && (
                                        <h6 className="h6 f-medium">{option.title}</h6>
                                    )}
                                    {option.description && (
                                        <p>{option.description}</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div
                                key={optionIndex}
                                className={`tr__dropdown__item ${selectedValue && option.key === selectedValue.key && isInputMode() ? 'active' : ''}`}
                                onClick={() => handleChange(option)}
                            >
                                <h6 className="h6">{option.value}</h6>
                            </div>
                        )}
                    </React.Fragment>
                )) : '')}
            </div>
            )}
            
            <p
                className={`error ${error && errorMessage && (isMultiSelectMode() || !selectedValue || comparable) ? 'active' : ''}`}
            >{errorMessage && errorMessage.length > 1 ? `${errorMessage}. ` : ''}{selectedValue ? '' : 'Select an item from dropdown'}</p>
            {isListMode() && renderList && renderList(value)}
        </div>
    )
};

Dropdown.propTypes = {
    className: PropTypes.string,
    mode: PropTypes.oneOf(['icon', 'input', 'select', 'multiselect']),
    type: PropTypes.oneOf(['inline', 'list']),
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    disabled: PropTypes.bool,
    label: PropTypes.string,
    horizontalLabel: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    error: PropTypes.any,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    onRemove: PropTypes.func,
    dropdownPosition: PropTypes.oneOf(['left', 'right', 'center']),
    render: PropTypes.func,
    renderList: PropTypes.func,
    renderLabel: PropTypes.func,
    required: PropTypes.bool,
    addButton: PropTypes.bool,
    addButtonLabel: PropTypes.string,
    addButtonClick: PropTypes.func,
    defaultValue: PropTypes.any,
    refs: PropTypes.any,
    onInputChange: PropTypes.func,
    searchLoading: PropTypes.bool,
    name: PropTypes.string,
    addedValues: PropTypes.array,
    single: PropTypes.bool
}