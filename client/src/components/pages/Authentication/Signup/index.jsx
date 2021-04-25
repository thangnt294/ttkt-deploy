import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import './index.scss';
import { AuthContext } from 'contexts';
import {
    Input,
    Button,
    DescriptionInput
} from 'components';
import { getErrorMessage, isEmail, isValidPassword } from 'utils';
import { NOTIFICATION_URL } from 'actions';

export const Signup = () => {
    const history = useHistory();
    const { doRegister } = useContext(AuthContext);

    const { handleSubmit, register, errors, reset, watch } = useForm();
    const location = useLocation();
    const query = Object.fromEntries(new URLSearchParams(location.search));
    const [pwdToggle, setPwdToggle] = useState(false);
    const [confirmPwdToggle, setConfirmPwdToggle] = useState(false);

    const handleSignup = data => {
        const {
            name,
            password,
            email,
            memberId
        } = data;

        const params = {
            email,
            password,
            name
        };

    if (memberId) params.memberId = memberId;

        doRegister(params, () => {
            reset();
            history.push({
                pathname: NOTIFICATION_URL,
                state: {
                    title: 'You are almost there!',
                    content: 'Thank you for registering with us. You can log in now!',
                    bigContent: false
                }
            })
        });
    }
    return (
        <form onSubmit={handleSubmit(handleSignup)}>
            <div className="tr__authentication--signup">
                <Input
                    hidden
                    name="memberId"
                    refs={register({})}
                    defaultValue={query && query.memberId}
                />
                <Input
                    label="Email"
                    name="email"
                    className="big-label mbx4"
                    placeholder="e.g: yourname@gmail.com"
                    refs={register({ required: true, validate: isEmail })}
                    defaultValue={query && query.email}
                    maxLength="128"
                    error={!!errors.email}
                    errorMessage={getErrorMessage(errors.email, "Email", "Invalid email format")}
                />
                <Input
                    label="Name"
                    name="name"
                    className="big-label mbx4"
                    placeholder="e.g: James Doe"
                    refs={register({ required: true, minLength: 3 })}
                    error={!!errors.name}
                    errorMessage={getErrorMessage(errors.name, "Name", "Name must be at least 3 characters")}
                />
                <DescriptionInput
                    label="Password"
                    name="password"
                    className="big-label mbx4"
                    placeholder="Enter password"
                    icon={pwdToggle ? "icon-eye-slash" : "icon-eye"}
                    iconPosition="right"
                    type={pwdToggle ? 'text' : 'password'}
                    onIconToggle={() => setPwdToggle(!pwdToggle)}
                    refs={register({ required: true, validate: isValidPassword })}
                    error={!!errors.password}
                    errorMessage={getErrorMessage(errors.password, "Password", "Invalid password")}
                    message='Please setup a password which has:'
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    className="big-label mbx4"
                    placeholder="Enter password"
                    icon={confirmPwdToggle ? "icon-eye-slash" : "icon-eye"}
                    iconPosition="right"
                    type={confirmPwdToggle ? 'text' : 'password'}
                    onIconToggle={() => setConfirmPwdToggle(!confirmPwdToggle)}
                    refs={register({ required: true, validate: value => value === watch('password') })}
                    error={!!errors.confirmPassword}
                    errorMessage={getErrorMessage(errors.confirmPassword, "Confirm Password", "Password doesn't match")}
                />
                <div className="d-flex justify-content-center mtx4 mbx4">
                    <Button
                        isSubmitBtn={true}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </form>
    )
}
