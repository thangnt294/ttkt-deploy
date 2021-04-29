import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { 
    Input, 
    Checkbox, 
    Button,
    DescriptionInput
} from 'components';
import { AuthContext } from 'contexts';
import { 
    FORGET_PASSWORD_URL,
    ALL_TEAMS_URL
} from 'actions';
import { getErrorMessage, isEmail, isValidPassword } from 'utils';

export const Login = () => {
    const history = useHistory();
    const { doLogin } = useContext(AuthContext);

    const { handleSubmit, register, errors, reset } = useForm();
    const [checkRemember, setCheckRemember] = useState(false);
    const [pwdToggle, setPwdToggle] = useState(false);

    const handleLogin = data => {
        const {
            email,
            password
        } = data;

        doLogin({
            email,
            password
        }, () => {
            reset();
            history.push(ALL_TEAMS_URL);
        }, checkRemember)
    }

    const handleForgot = () => {
        history.push(FORGET_PASSWORD_URL);
    }
    

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className="tr__authentication--login">
                <div className="tr__authentication--login__body">
                    <Input 
                        label="Email"
                        name="email"
                        className="big-label mbx4"
                        placeholder="e.g: yourname@gmail.com"
                        refs={register({ required: true, validate: isEmail })}
                        maxLength="128"
                        error={!!errors.email}
                        errorMessage={getErrorMessage(errors.email, "Email", "Invalid email format")}
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
                    />
                </div>
                <div className="tr__authentication--login__footer mtx4 mbx4">
                    <div className="d-flex justify-content-between align-items-center">
                        {/*<Checkbox */}
                        {/*    label="Remember me" */}
                        {/*    checked={checkRemember}*/}
                        {/*    onChange={() => setCheckRemember(!checkRemember)} */}
                        {/*/>*/}
                        {/*<p */}
                        {/*    className="tr__link"*/}
                        {/*    onClick={handleForgot}*/}
                        {/*>*/}
                        {/*    Forgot password ?*/}
                        {/*</p>*/}
                    </div>
                    <Button
                        isSubmitBtn={true}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </form>
    )
}
