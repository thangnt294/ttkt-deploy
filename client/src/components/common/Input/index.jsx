import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Button } from 'components';

export const Input = ({
    className = '',
    id,
    label,
    type = 'text',
    icon,
    value,
    defaultValue,
    iconPosition = 'left',
    name,
    error,
    errorMessage,
    disabled = false,
    placeholder = 'Please enter the value...',
    onChange = () => {},
    onNumberChange = () => {},
    onIconClick = () => {},
    onIconToggle = () => {},
    loading = false,
    viewOnly = false,
    maxLength = 200,
    autoComplete = 'off',
    refs,
    ...rest
}) => {
    const isFontIcon = () => typeof icon === 'string' && icon.indexOf('icon') > -1;
    const isImage = () => typeof icon === 'object' || (typeof icon === 'string' && icon.indexOf('base64') > -1);
    const isCustomHTML = () => typeof icon === 'function';
    const isNumberMode = () => type && type === 'number';

    const handleNumberChange = num => {
        let updatedNumber = value ? value : 0;
        updatedNumber += updatedNumber === 0 ? (num > 0 ? num : num) : num;

        onNumberChange(updatedNumber);
    }

    return (
        <div id={id} className={`tr__field ${className} ${icon ? 'icon' : ''} ${iconPosition} ${disabled ? 'disabled' : ''} ${isNumberMode() ? 'number' : ''}`}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            <div className="tr__field--wrapper">
                {viewOnly ? (
                    <p className="label">{defaultValue || value}</p>
                ) : (
                    <input
                        key={defaultValue}
                        type={type}
                        name={name}
                        id={name}
                        className={`tr__field-input ${error ? 'error' : ''}`}
                        placeholder={disabled ? '' : placeholder}
                        autoComplete={autoComplete}
                        ref={refs}
                        onChange={onChange}
                        value={value}
                        defaultValue={defaultValue}
                        disabled={disabled || isNumberMode()}
                        readOnly={disabled || isNumberMode()}
                        maxLength={maxLength}
                        {...rest}
                    />
                )}

                {!loading && (
                    <>
                        {icon && isFontIcon() && (
                            <i
                                className={`${icon} ${onIconClick || onIconToggle ? 'hoverable' : ''}`}
                                onMouseDown={onIconToggle}
                                onMouseUp={onIconToggle}
                                onClick={onIconClick}
                            />
                        )}

                        {icon && isImage() && (
                            <img
                                src={icon}
                                alt="Input icon"
                                onMouseDown={onIconToggle}
                                onMouseUp={onIconToggle}
                                onClick={onIconClick}
                            />
                        )}

                        {icon && isCustomHTML() && icon()}
                    </>
                )}

                <i className={`loading ${loading ? 'active' : ''}`} />

                {isNumberMode() && (
                    <div className="number-btns">
                        <Button
                            className="icon outline"
                            type="secondary"
                            icon="icon-plus"
                            onClick={() => handleNumberChange(1)}
                        />
                        <Button
                            className={`icon outline`}
                            type="secondary"
                            icon="icon-minus"
                            onClick={() => handleNumberChange(-1)}
                        />
                    </div>
                )}
            </div>

            <p
                className={`error ${error && errorMessage && 'active'}`}
            >{errorMessage}</p>
        </div>
    )
};

export const Textarea = ({
    className = '',
    label,
    icon,
    value,
    defaultValue,
    iconPosition = 'left',
    name,
    error,
    errorMessage,
    placeholder = 'Please type in the value...',
    onChange = () => {},
    maxLength = "1000",
    refs,
    ...rest
}) => {
    return (
        <div className={`tr__field ${className} ${icon ? 'icon' : ''} ${iconPosition}`}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            <textarea
                name={name}
                rows="3"
                id={name}
                className={`tr__field-input ${error && 'error'}`}
                placeholder={placeholder}
                autoComplete="new-password"
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
                maxLength={maxLength ? maxLength : 1000}
                ref={refs}
                {...rest}
            />

            {/*** In case type of icon is string ***/}
            {icon && typeof icon === 'string' && (
                <i className={icon} />
            )}
            {/*** !!! In case type of icon is string ***/}

            {/*** In case type of icon is object ***/}
            {icon && typeof icon === 'object' && (
                <i
                    className={icon.className ? icon.className : ''}
                    onClick={icon.onClick ? icon.onClick : () => {}}
                    style={{
                        cursor: icon.cursor ? icon.cursor : 'default',
                    }}
                />
            )}
            {/*** !!! In case type of icon is object ***/}

            <p
                className={`error ${error && errorMessage && 'active'}`}
            >{errorMessage}</p>
        </div>
    )
};

export const InputGroup = ({ title, children }) => {
    return (
        <div className="tr__input-group">
            {title && (
                <h5 className="h5 f-medium mbx1">{title}</h5>
            )}
            <div className="tr__input-group--fields">
                {children}
            </div>
        </div>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    error: PropTypes.any,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onNumberChange: PropTypes.func,
    refs: PropTypes.any,
    onIconClick: PropTypes.func,
    onIconToggle: PropTypes.func,
    loading: PropTypes.bool,
    viewOnly: PropTypes.bool,
    id: PropTypes.string,
    autoComplete: PropTypes.string,
    maxLength: PropTypes.number
};

Textarea.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    error: PropTypes.any,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    refs: PropTypes.any,
};

InputGroup.propTypes = {
    title: PropTypes.string
};
