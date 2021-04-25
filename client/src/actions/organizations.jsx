import axios from 'axios';
import { authHeaders } from 'actions';
import {
    ORGANIZATIONS,
    GET_ORGANIZATION,
    JOIN_ORGANIZATION,
    JOIN_REQUEST_ORGANIZATION
} from './constants';

/** Get Organizations
* @param {
*      name: string
*      id: [string]
*      page: int
*      limit: int
*      sort: name_asc | name_desc | ...
* } params 
*/
export const getOrganizations = (params, token) => {
    return axios.get(ORGANIZATIONS, params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

/** Get a Organization
* @param {
*      _id: string
* } payload 
*/
export const getOrganization = (orgId, token) => {
    if (!orgId) return;
    return axios.get(GET_ORGANIZATION.replace(':orgId', orgId), authHeaders(token));
};

/** Add new Organization
* @param {
*      logo: string
*      name: string
*      contactEmail: string
*      contactPhoneNumber: string
*      companyAddress: string
*      country: string
*      postalCode: string
*      companyRegisteredAddress: string
*      registrationNumber: int
*      companyTaxNumber: int
*      billingEmails: string[],
*      paymentCards: [
*           {
*               cardName: string
*               cardNumber: int
*               expiredDate: int
*               cvv: int
*               primary: bool
*           }
*      ]
* } payload 
*/
export const createOrganization = (payload, token) => {
    if (!payload) return;
    return axios.post(ORGANIZATIONS, payload, authHeaders(token));
};

/** Update a Organization
* @param {
*      logo: string
*      name: string
*      contactEmail: string
*      contactPhoneNumber: string
*      companyAddress: string
*      country: string
*      postalCode: string
*      companyRegisteredAddress: string
*      registrationNumber: int
*      companyTaxNumber: int
*      billingDetails: [
*           {
*               cardName: string
*               cardNumber: int
*               expiredDate: int
*               cvv: int
*               primary: bool
*           }
*      ]
* } payload 
*/
export const updateOrganization = (payload, token) => {
    if (!payload) return;
    return axios.put(ORGANIZATIONS, payload, authHeaders(token));
};

/** Remove a Organization
* @param {
*      _id: string
* } 
*/
export const removeOrganization = (orgId, token) => {
    if (!orgId) return;
    return axios.delete(GET_ORGANIZATION.replace(':orgId', orgId), authHeaders(token));
};

/** Join a Organization
 * @param {
 *      message: string
 * } payload
 */
export const joinOrganization = (orgId, payload, token) => {
    if (!orgId) return;
    return axios.put(JOIN_ORGANIZATION.replace(':orgId', orgId), payload, authHeaders(token));
}

/** Cancel or Reject a join request
 * @param {
 *     id: string
 *     memberId: string
 * } params
 */
export const cancelJoinRequest = (orgId, memberId, token) => {
    if (!orgId && !memberId) return;
    let url = JOIN_REQUEST_ORGANIZATION.replace(':orgId', orgId);
    return axios.delete(url.replace(':memberId', memberId), authHeaders(token));
}

/** Cancel or Reject a join request
* @param {
*     id: string
*     memberId: string
* } params
*/
export const getJoinRequest = (orgId, memberId, token) => {
    if (!orgId && !memberId) return;
    let url = JOIN_REQUEST_ORGANIZATION.replace(':orgId', orgId);
    return axios.get(url.replace(':memberId', memberId), authHeaders(token));
}

/**Approve a join request
* @param {
*    role: string,
*    teams: [
*       {
*           id: string,
*           role: string
*       }
*   ]   
*}
* 
*/
export const approveJoinRequest = (orgId, memberId, payload, token) => {
    if (!orgId && !memberId) return;
    let url = JOIN_REQUEST_ORGANIZATION.replace(':orgId', orgId);
    return axios.put(url.replace(':memberId', memberId), payload, authHeaders(token));
}