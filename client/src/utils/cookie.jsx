import moment from 'moment';
import {
    ACCESS_TOKEN,
    ACCESS_TOKEN_EXPIRY,
    generateToken,
    REFRESH_TOKEN,
    REFRESH_TOKEN_EXPIRY
} from "actions";
import { dateTimestampConverter } from 'utils';

export const getCookie = name => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
}

export const getToken = () => {
    const accessToken = getCookie(ACCESS_TOKEN);
    const ssAccessToken = sessionStorage.getItem(ACCESS_TOKEN);

    return accessToken || ssAccessToken || null;
}

const removeExpiredSS = (expiredKey, mainKey) => {
    let expiry = parseInt(sessionStorage.getItem(expiredKey) || 0, 10);
    expiry = !isNaN(expiry) ? new Date(expiry) : null;

    if (!expiry || (expiry && moment(expiry).diff(moment()) <= 0)) {
        sessionStorage.removeItem(mainKey);

        if (expiry) sessionStorage.removeItem(expiredKey);
    }
}

export const assignToken = async callback => {
    // console.log("ádasdasd")
    // removeExpiredSS(ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN);
    // removeExpiredSS(REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN);

    // const accessToken = getCookie(ACCESS_TOKEN);
    // const refreshToken = getCookie(REFRESH_TOKEN);

    // const ssAccessToken = sessionStorage.getItem(ACCESS_TOKEN);
    // const ssRefreshToken = sessionStorage.getItem(REFRESH_TOKEN);

    // if ((!accessToken && refreshToken) || (!ssAccessToken && ssRefreshToken)) {
    //     try {
    //         const response = await generateToken({
    //             refreshToken: refreshToken || ssRefreshToken
    //         });
    //         const { data, status } = response;
    
    //         if (status === 200) {
    //             const { accessToken } = data;

    //             if (refreshToken) createCookie(ACCESS_TOKEN, accessToken, 1);
    //             else {
    //                 sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    //                 sessionStorage.setItem(ACCESS_TOKEN_EXPIRY, new Date().getTime() + dateTimestampConverter);
    //             }
                if (callback) callback()
    //         }
    
    //         return null;
    //     } catch (error) {
    //         console.log(error);
    //         if (callback) callback()
    //     }
    // } else {
    //     if (callback) callback()
    // }
}

export const createCookie = (name, value, days = 1) => {
    let expires = "";

    if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
        expires = "";
    }
	document.cookie = name + "=" + value + expires + "; path=/";
}

export const removeCookie = name => {
    createCookie(name, "", -1);
}

export const removeAll = () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
    sessionStorage.removeItem(ACCESS_TOKEN_EXPIRY);
    sessionStorage.removeItem(REFRESH_TOKEN_EXPIRY);
}