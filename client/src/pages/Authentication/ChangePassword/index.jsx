import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { AuthContext, HomeContext } from 'contexts';
import { 
    Button, 
    Input,
    AuthenticationHeader,
    DescriptionInput,
} from 'components';
import { getErrorMessage, isValidPassword } from 'utils';

const ChangePassword  = () => {
    const history =  useHistory();
    const {
        authErrorActive,
        authErrorMessage,
        authErrorType,
        setAuthErrorMessage,
        setAuthErrorType
    } = useContext(HomeContext);
    const { doChangePassword } = useContext(AuthContext);
    
    const { handleSubmit, register, errors, reset, watch } = useForm();
    const [currentPwdToggle, setCurrentPwdToggle] = useState(false);
    const [pwdToggle, setPwdToggle] = useState(false);
    const [confirmPwdToggle, setConfirmPwdToggle] = useState(false);
    
    const handleBack = () => {
        history.goBack();
    }

    const handleChangePassword = data => {
        const {
            oldPassword,
            password
        } = data;

        doChangePassword({
            oldPassword,
            password
        }, () => {
            reset();
            setAuthErrorType('success');
            setAuthErrorMessage(`Password updated successfully!`)
            // history.goBack();
        })
    }

    return (
        <form onSubmit={handleSubmit(handleChangePassword)} className="tr__change-password--form">
            <p className={`tr__message ${authErrorType} mbx2 ${authErrorActive ? 'active' : ''}`}>{authErrorMessage}</p>
            <div className="tr__change-password">
                <AuthenticationHeader title="Change Password" />
                <div className="tr__change-password--content">
                    <Input 
                        label="Current Password" 
                        name="oldPassword"
                        className="big-label mbx4"
                        placeholder="Enter password"
                        icon={currentPwdToggle ? "icon-eye-slash" : "icon-eye"}
                        iconPosition="right"
                        type={currentPwdToggle ? 'text' : 'password'}
                        onIconToggle={() => setCurrentPwdToggle(!currentPwdToggle)}
                        refs={register({ required: true, validate: isValidPassword })}
                        error={!!errors.oldPassword}
                        errorMessage={getErrorMessage(errors.oldPassword, "Old Password", "Invalid password")}
                    />
                    <DescriptionInput
                        label="New Password" 
                        name="password"
                        className="big-label mbx4"
                        placeholder="Enter password"
                        icon={pwdToggle ? "icon-eye-slash" : "icon-eye"}
                        iconPosition="right"
                        type={pwdToggle ? 'text' : 'password'}
                        onIconToggle={() => setPwdToggle(!pwdToggle)}
                        refs={register({ required: true, validate: isValidPassword })}
                        error={!!errors.password}
                        errorMessage={getErrorMessage(errors.password, "New Password", "Invalid password")}
                    />       
                    <Input 
                        label="Confirm New Password" 
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
                </div>
                <div className="tr__change-password--footer mtx4 mbx4">
                    <Button 
                        className="outline"
                        type="secondary"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        isSubmitBtn={true}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    )
}
export default ChangePassword;