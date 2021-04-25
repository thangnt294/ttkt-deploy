import axios from 'axios';
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_CHANGE_PASSWORD,
    AUTH_GET_USER_INFO,
    AUTH_GENERATE_TOKEN,
    AUTH_FORGOT_PASSWORD,
    AUTH_CONFIRM_FORGOT_PASSWORD,
} from './constants';

export const authHeaders = token => {
    return {
        headers: {
            'Authorization': token
        }
    }
}

export const login = payload => {
    if (!payload) return;
    return axios.post(AUTH_LOGIN, payload);
};

export const register = payload => {
    if (!payload) return;
    return axios.post(AUTH_REGISTER, payload);
};

export const changePassword = (payload, token) => {
    if (!payload) return;
    return axios.put(AUTH_CHANGE_PASSWORD, payload, authHeaders(token));
};

export const getUserInfo = token => {
    return axios.get(AUTH_GET_USER_INFO, authHeaders(token));
};

export const generateToken = payload => {
    if (!payload) return;
    return axios.post(AUTH_GENERATE_TOKEN, payload);
};

export const forgotPassword = userName => {
    return axios.get(AUTH_FORGOT_PASSWORD, {
        params: {
            userName
        }
    });
};

export const confirmForgotPassword = payload => {
    if (!payload) return;
    return axios.post(AUTH_CONFIRM_FORGOT_PASSWORD, payload);
};
