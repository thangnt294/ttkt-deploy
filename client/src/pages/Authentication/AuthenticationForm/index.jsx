import React, { useContext, useState } from 'react';
import './index.scss';
import logo from 'assets/images/logo-white.png';
import bgLogin from 'assets/images/login-bg.png';
import { 
    Route, 
    Switch, 
    useHistory, 
    useLocation 
} from 'react-router-dom';

import { 
    Login,
    Signup,
    Tab,
    TabPane,
} from 'components';
import { 
    LOGIN, 
    LOGIN_URL, 
    SIGNUP, 
    SIGNUP_URL
} from 'actions';
import { HomeContext } from 'contexts';

const AuthenticationForm = () => {
    const location = useLocation();
    const history = useHistory();
    const [currentTab, setCurrentTab] = useState(location.pathname.indexOf(LOGIN_URL) > -1 ? 0 : 1);
    const { authErrorActive, authErrorMessage, authErrorType } = useContext(HomeContext);

    const getTabUrl = tab => {
        return tab ? SIGNUP_URL : LOGIN_URL;
    }
    
    const handleTabChange = tab => {
        const cTab = tab === 'login' ? 0 : 1;
        const currentUrl = getTabUrl(cTab);
        setCurrentTab(cTab);
        history.push(currentUrl);
    }

    return (
        <div className="tr__authentication-form">
            <p className={`tr__message ${authErrorType} mbx2 ${authErrorActive ? 'active' : ''}`}>{authErrorMessage}</p>
            <div 
                className="tr__authentication-form--logo d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage: 'url(' + bgLogin + ')',
                }}
            >
                {/*<img src={logo} alt="Trames Client" />*/}
            </div>
            <div className="tr__authentication-form--content">
                <Tab
                    initialTab={currentTab} 
                    onTabClick={handleTabChange}
                    animated={true}
                >
                    <TabPane tabName={LOGIN} tabSlug={LOGIN.replace(/\s+/g, '').toLowerCase()}>
                        <Switch>
                            <Route path={LOGIN_URL} exact>
                                <Login />
                            </Route>
                        </Switch>
                    </TabPane>
                    <TabPane tabName={SIGNUP} tabSlug={SIGNUP.replace(/\s+/g, '').toLowerCase()}>
                        <Switch>
                            <Route path={SIGNUP_URL} exact>
                                <Signup />
                            </Route>
                        </Switch>
                    </TabPane>
                </Tab>
            </div>
        </div>
    )
}

export default AuthenticationForm;
