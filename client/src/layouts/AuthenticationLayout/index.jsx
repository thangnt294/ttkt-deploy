import React from 'react';
import './index.scss';
import { 
    Redirect, 
    Route, 
    Switch, 
    useLocation 
} from 'react-router-dom';
import { delayImport } from 'utils';
import bgAuthentication from 'assets/images/authentication-bg.png';
import {
    AUTHENTICATION_URL,
    CHANGE_PASSWORD_URL, 
    FORGET_PASSWORD_URL, 
    LOGIN_URL, 
    NOTIFICATION_URL, 
    NOT_FOUND_URL,
    SIGNUP_URL
} from 'actions';

const AuthenticationForm = delayImport(import('pages/Authentication/AuthenticationForm'));
const ChangePassword  = delayImport(import('pages/Authentication/ChangePassword'));
const ForgetPassword  = delayImport(import('pages/Authentication/ForgetPassword'));
const Notification = delayImport(import('pages/Authentication/Notification'));

const AuthenticationLayout = () => {
    const location = useLocation();

    return (
        <div 
        className={`tr__authentication-layout d-flex ${location.pathname === LOGIN_URL || location.pathname === SIGNUP_URL ? "justify-content-end" : "justify-content-center" } align-items-center`}
        style={{backgroundImage: 'url(' + bgAuthentication + ')'}}
        >
                <Switch>
                    <Route path={AUTHENTICATION_URL} exact>
                        <Redirect to={LOGIN_URL} />
                    </Route>
                    <Route path={LOGIN_URL} exact component={AuthenticationForm} />
                    <Route path={SIGNUP_URL} exact component={AuthenticationForm} />
                    <Route path={CHANGE_PASSWORD_URL} exact component={ChangePassword} />
                    <Route path={FORGET_PASSWORD_URL} exact component={ForgetPassword} />
                    <Route path={NOTIFICATION_URL} exact component={Notification} />
                    <Route path="*">
                        <Redirect to={NOT_FOUND_URL} />
                    </Route>
                </Switch>
        </div>
    )
};

export default AuthenticationLayout;