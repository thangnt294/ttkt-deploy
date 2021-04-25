import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { AuthContext, HomeContext } from 'contexts';
import { 
    Button, 
    Input,
    AuthenticationHeader,
    DescriptionInput
} from 'components';
import { 
    LOGIN_URL, NOTIFICATION_URL
} from 'actions';
import { getErrorMessage, isEmail, isValidPassword, isConfirmationCode } from 'utils';

const waitingTime = 30;

const ForgetPassWord = () => {
    const history = useHistory();
    const { doVerifyUsername, doConfirmForgotPassword } = useContext(AuthContext);
    const { authErrorActive, authErrorMessage, authErrorType } = useContext(HomeContext);

    const { handleSubmit, register, errors, getValues, watch, reset } = useForm();
    const [userInfo, setUserInfo] = useState(null);
    const [step, setStep] = useState(0);
    const [codeSent, setCodeSent] = useState(false);
    const [countDown, setCountDown] = useState(waitingTime);
    const [pwdToggle, setPwdToggle] = useState(false);
    const [confirmPwdToggle, setConfirmPwdToggle] = useState(false);

    let interval = null;

    const verify = userName => {
        doVerifyUsername(userName, () => {
            setStep(1);
            setCodeSent(true);

            interval = setInterval(() => {
                setCountDown(oldCount => {
                    if (oldCount > 0) return oldCount - 1;
                    else {
                        clearInterval(interval);
                        setCountDown(waitingTime);
                        setCodeSent(false);
                    }
                })
            }, 1000)
        })
    }

    const handleBackOrResend = () => {
        if (step === 1) {
            const userName = getValues('userName');
            if (userName) verify(userName);
        } else if (step === 2) {
            setStep(0);
        } else {
            history.push(LOGIN_URL);
        }
    }

    const verifyUsername = data => {
        const { userName, confirmationCode, password } = data;

        if (userName) {
            if (step === 1) {
                setCodeSent(false);
                setUserInfo({
                    userName,
                    confirmationCode
                })
                setStep(2);
            } else if (step === 0) {
                verify(userName);
            }
        } else {
            doConfirmForgotPassword({
                userName: userInfo.userName,
                password,
                confirmationCode: userInfo.confirmationCode
            }, () => {
                reset();
                history.push({
                    pathname: NOTIFICATION_URL,
                    state: {
                        title: 'Welcome to Trames!',
                        content: 'Your password has been reset successfully.',
                        bigContent: true
                    }
                })
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(verifyUsername)} className="tr__forget-password--form">
            <p className={`tr__message ${authErrorType} mbx2 ${authErrorActive ? 'active' : ''}`}>{authErrorMessage}</p>
            <div className='tr__forget-password'>
                <AuthenticationHeader
                    title={step < 2 ? 'Forgot Password' : 'Reset password'}
                    description={step < 2 ? 'Don’t worry. We’re here to help you reset your password. Please enter your email address registered with us.' : ''}
                />
                <div className="tr__forget-password--content">
                    {step < 2 && (
                        <Input
                            label="E-mail"
                            className="big-label mbx4"
                            name="userName"
                            placeholder="e.g: yourname@gmail.com"
                            refs={register({ required: true, validate: isEmail })}
                            maxLength="128"
                            error={!!errors.userName}
                            errorMessage={getErrorMessage(errors.userName, "Email", "Invalid email format")}
                        />
                    )}
                    {step === 1 && (
                        <Input 
                            label="Verification Code"
                            className="big-label mbx4"
                            placeholder="****"
                            name="confirmationCode"
                            refs={register({ required: true, validate: isConfirmationCode })}
                            error={!!errors.confirmationCode}
                            errorMessage={getErrorMessage(errors.confirmationCode, "Verification Code", "Invalid verification code")}
                        />
                    )}
                    {step === 2 && (
                        <>
                            <DescriptionInput
                                label="New Password" 
                                name="password"
                                className="big-label mbx4"
                                placeholder="Enter password"
                                icon={confirmPwdToggle ? "icon-eye-slash" : "icon-eye"}
                                iconPosition="right"
                                type={confirmPwdToggle ? 'text' : 'password'}
                                onIconToggle={() => setConfirmPwdToggle(!confirmPwdToggle)}
                                refs={register({ required: true, validate: isValidPassword })}
                                error={!!errors.password}
                                errorMessage={getErrorMessage(errors.password, "Password", "Invalid password")}
                            />       
                            <Input 
                                label="Confirm New Password" 
                                name="confirmPassword"
                                className="big-label mbx4"
                                placeholder="Enter password"
                                icon={pwdToggle ? "icon-eye-slash" : "icon-eye"}
                                iconPosition="right"
                                type={pwdToggle ? 'text' : 'password'}
                                onIconToggle={() => setPwdToggle(!pwdToggle)}
                                refs={register({ required: true, validate: value => value === watch('password') })}
                                error={!!errors.confirmPassword}
                                errorMessage={getErrorMessage(errors.confirmPassword, "Confirm Password", "Password doesn't match")}
                            />
                        </>
                    )}
                </div>
                <div className="tr__forget-password--footer mtx4 mbx4">
                    <Button
                        className="outline"
                        type="secondary"
                        disabled={codeSent}
                        onClick={handleBackOrResend}
                    >
                        {step === 1 ? (codeSent ? `Wait for ${countDown} second${countDown > 1 ? 's' : ''} to re-send` : 'Re-send Verification Code') : 'Back'}
                    </Button>
                    <Button 
                        isSubmitBtn={true}
                    >
                        {step < 2 ? (step === 1 ? 'Submit' : 'Send Verification Code') : 'Save Changes'}
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ForgetPassWord;
