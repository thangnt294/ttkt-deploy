import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'styles/index.scss';

import React, { Suspense, useEffect, useState, useContext } from "react";
import ReactDOM from 'react-dom';
import { Router, withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { assignToken, delayImport, getCookie } from 'utils';

import * as serviceWorker from './serviceWorker';

import { Spinner, Modals } from 'components';
import {
    HomeContextProvider,
    AuthContext
} from 'contexts';
import { ACCESS_TOKEN, CHANGE_PASSWORD_URL } from 'actions';

declare var window: any;

const HomeLayout = delayImport(import('layouts/HomeLayout'));
const NotFound = delayImport(import('pages/NotFound'));
const AuthenticationLayout = delayImport(import('layouts/AuthenticationLayout'));

const customHistory = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest} : any) => (
	<Route {...rest} render={(props) => {
		const accessToken = getCookie(ACCESS_TOKEN);
		const ssAccessToken = sessionStorage.getItem(ACCESS_TOKEN);

		return (
			accessToken || ssAccessToken ? <Component {...props} /> : <Redirect to="/authentication" />
		)
	}} />
)

const LoggedInRoute = ({ component: Component, ...rest} : any) => (
	<Route {...rest} render={(props) => {
		const accessToken = getCookie(ACCESS_TOKEN);
		const ssAccessToken = sessionStorage.getItem(ACCESS_TOKEN);
		const changePasswordUrl = props.location.pathname.indexOf(CHANGE_PASSWORD_URL) > -1;
		
		return (
			(accessToken || ssAccessToken) && !changePasswordUrl ? <Redirect to="/" /> : <Component {...props} />
		)
	}} />
)

const App = () => {

	return (
		<>
			<Switch>
				<Route path="/not-found" component={NotFound} />
				<LoggedInRoute path="/authentication" component={AuthenticationLayout} />
				<PrivateRoute path="/" component={HomeLayout} />
			</Switch>
			<Modals />
		</>
	);
};

const AppRootWithRouter = withRouter(App);

const Root = () => {
	const [isAssigningToken, setIsAssigningToken] = useState(false);

	/*eslint-disable */
	useEffect(() => {
		assignToken(() => {
			setIsAssigningToken(true);
		});
	}, [])
	/*eslint-enable */
	
	return isAssigningToken ? (
		<Suspense fallback={<Spinner />}>
			<HomeContextProvider>
				<Router history={customHistory}>
					<AppRootWithRouter />
				</Router>
			</HomeContextProvider>
		</Suspense>
	) : <></>;
};

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();