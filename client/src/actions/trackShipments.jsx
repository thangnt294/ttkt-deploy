import axios from 'axios';
import { authHeaders } from './auth';
import {
    GET_CARRIERS,
    GET_LOCODES,
    GET_ROUTES,
    GET_TRACKERS
} from './constants'


/** Get Track shipment
* @param {
*      type: string (['BC', 'BL', BK'], default is BC)
*      params: {
*           carrierNo: string,
*           containerNo: string,
*           originCode: string,
*           destCode: string
*     }
*} params
*/
export const getTrackers = (params, token) => {
    return axios.get(GET_TRACKERS, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get Carriers
* @param {
*      nameOrCode : string
*      limit: int
* } params
*/
export const getCarriers = (params, token) => {
    return axios.get(GET_CARRIERS, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get Routes
* @param {
*     imo : string,
*     originPort: string, 
*     destinaionPort: string
* } params
*/
export const getRoute = (params, token) => {
    return axios.get(GET_ROUTES, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get Locodes
* @param {
*      cop : string
*      limit: int
* } params
*/
export const getLocodes = (params, token) => {
    return axios.get(GET_LOCODES, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};