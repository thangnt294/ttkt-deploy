import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import { LOGIN_URL } from 'actions';

const AuthenticationNotification = () => {
    const location = useLocation();
    const history = useHistory();
    const [state, setState] = useState({
        title : '',
        content: '',
        bigContent: false,
    });

    /*eslint-disable */
    useEffect(() => {
        if (!location.state) routeToLogin();
        else {
            const { title, content, bigContent } = location.state;
            setState({
                title,
                content,
                bigContent
            })
        }
    }, [])
    /*eslint-enable */

    const routeToLogin = () => {
        history.push(LOGIN_URL);
    }
    return (
        <div className='tr__auth-notification'>
            <h3 className={`${state.bigContent ? 'big-content' : ''} f-medium mtx2`}>{state.title}</h3>
            <p className='mbx2'>
                {state.content}
            </p>
            <Button 
                onClick={routeToLogin}
                className="mbx4"
            >
                Click to Login
            </Button>
        </div>
    )
}

export default AuthenticationNotification;