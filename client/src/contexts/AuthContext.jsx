import React, {createContext, useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {MemberContextProvider} from './MemberContext';
import {ModalContextProvider} from './ModalContext';
import {TeamContextProvider} from './TeamContext';

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  changePassword,
  confirmForgotPassword,
  forgotPassword,
  getMember,
  getUserInfo,
  login,
  OPERATION_FAILED_MESSAGE,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  register,
} from 'actions';
import {GET_FILE} from 'actions/constants';
import {HomeContext} from './HomeContext';
import {createCookie, dateTimestampConverter, getToken} from 'utils';
import {UploadFileContextProvider} from "./UploadFileContext";
import { TaskContextProvider } from './TaskContext';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const {setLoading, setAuthErrorMessage, setIsOwner} = useContext(HomeContext);
  const [loggedInUser, setLoggedInUser] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [userOrg, setUserOrg] = useState();

  /*eslint-disable */
  useEffect(() => {
    setLoggedInUser(getToken())
  }, [])

  /*eslint-enable */

  const handleException = error => {
    const {data} = error.response;
    setLoading(false);
    setAuthErrorMessage((data && (data.message || data.error)) || OPERATION_FAILED_MESSAGE);
  }

  const doLogin = async (payload, callback, rememberMe = false) => {
    try {
      setLoading(true);

      const response = await login(payload);
      const {data, status} = response;

      if (status === 200) {
        const {accessToken, refreshToken, accessTokenExpiration} = data;
        const duration = moment.duration(moment(new Date(accessTokenExpiration)).diff(new Date())).asMilliseconds();
        const expiredDays = duration / dateTimestampConverter;

        setLoggedInUser(accessToken);
        if (rememberMe) {
          createCookie(ACCESS_TOKEN, accessToken, expiredDays);
          createCookie(REFRESH_TOKEN, refreshToken, 30);
        } else {
          sessionStorage.setItem(REFRESH_TOKEN_EXPIRY, new Date().getTime() + (30 * dateTimestampConverter));
          sessionStorage.setItem(ACCESS_TOKEN_EXPIRY, accessTokenExpiration);
          sessionStorage.setItem(ACCESS_TOKEN, accessToken);
          sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
        }

        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doRegister = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await register(payload);
      const {data, status} = response;

      if (status === 200) {
        setLoggedInUser(data);
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doVerifyUsername = async (userName, callback) => {
    try {
      setLoading(true);

      const response = await forgotPassword(userName);
      const {status} = response;

      if (status === 200) {
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doConfirmForgotPassword = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await confirmForgotPassword(payload);
      const {status} = response;

      if (status === 200) {
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doChangePassword = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await changePassword(payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doGetUserInfo = async (callback, hasLoading = true) => {
    try {
      if (hasLoading) setLoading(true);

      const response = await getUserInfo(loggedInUser);
      const {data, status} = response;

      if (status === 200) {
        setUserInfo(data);
        if (callback) callback();
      }

      if (hasLoading) setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        loggedInUser,
        userOrg,
        doLogin,
        doRegister,
        doVerifyUsername,
        doConfirmForgotPassword,
        doChangePassword,
        doGetUserInfo,
        setUserOrg,
        setUserInfo,
        setLoggedInUser
      }}
    >
      <UploadFileContextProvider>
        <TeamContextProvider>
          <MemberContextProvider>
            <ModalContextProvider>
              {children}
            </ModalContextProvider>
          </MemberContextProvider>
        </TeamContextProvider>
      </UploadFileContextProvider>
    </AuthContext.Provider>
  );
};
