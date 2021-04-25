import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { 
    Input,
    Tooltip,
    InputGroup 
} from 'components';

import { passwordRequired } from 'utils';
export const DescriptionInput = ({
     label,
     name,
     className,
     info,
     message = 'Valid password which has:',
     ...rest
}) => {
    return (
        <div className={`tr__description-input ${className}`}>
            <InputGroup>    
                <label htmlFor={name}>
                    <span>{label}</span>
                    <Tooltip
                        renderContent={() => (
                            info && info.length > 0 ? (
                                <p>{info}</p>
                            ) : (
                                <div className="password-required">
                                    <div className="password-required--header d-flex align-items-center justify-content-between">
                                        <p>{message}</p>
                                    </div>
                                    <div className="password-required--content">
                                        {passwordRequired.map((message, statusIndex) => (
                                                <div className="password-required--item mtx05 d-flex align-items-center justify-content-between" key={statusIndex}>
                                                    <li className="label">{message}</li>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    >
                        <i className="icon-warning mlx1"></i>
                    </Tooltip>
                </label>
                <Input 
                    name={name}
                    {...rest}
                />
            </InputGroup>
        </div>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func]),
    error: PropTypes.any,
    errorMessage: PropTypes.string,
    placeholder: PropTypes.string,
    message: PropTypes.string,
};
