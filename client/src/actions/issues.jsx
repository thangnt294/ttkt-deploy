import axios from 'axios';
import { authHeaders } from './auth';
import { 
    ACTIVE_SHIPMENT_ISSUES,
    ACTIVE_SHIPMENT_ISSUE,
    ACTIVE_SHIPMENT_ISSUE_STATUS,
    ACTIVE_SHIPMENT_ISSUE_PARTNERS,
    ACTIVE_SHIPMENT_ISSUE_COMMENTS,
    TASKS_ISSUE
} from './constants';

/** Get issues of a shipment
* @param {
*      page: int
*      limit: int
*      status: string
* } params
*/
export const getIssues = (shipmentId, params, token) => {
    return axios.get(ACTIVE_SHIPMENT_ISSUES.replace(':shipmentId',shipmentId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Create an issue
* @param {
*      title: string
*      description: string
*      linkedTasks: [
*           string
*       ]    
*} payload
*/
export const createAnIssue = (shipmentId, payload, token) => {
    if (!payload) return;
        return axios.post
        (ACTIVE_SHIPMENT_ISSUES.replace(':shipmentId', shipmentId),
        payload, 
        authHeaders(token));
};

/** Get an issue 
*@param {
*  issueId: string   
*} param
*/
export const getIssue = (shipmentId, issueId, token) => {
    if(!issueId) return;
    let url = ACTIVE_SHIPMENT_ISSUE.replace(':shipmentId', shipmentId);
    return axios.get(url.replace(':issueId',issueId), authHeaders(token));
}

/** Change status of an issue 
*@param {
*   status: string    
*} payload 
*/
export const changeStatus = (shipmentId, issueId, payload, token) => {
    if(!issueId) return ;
    let url = ACTIVE_SHIPMENT_ISSUE_STATUS.replace(':shipmentId', shipmentId);
    return axios.put(url.replace(':issueId',issueId), payload, authHeaders(token));
    
}
 
/** Update issue
* @param {
*      title: string
*      description: string
*      linkedTasks: [
*           string
*       ]   
* } payload
*/
export const updateIssue = (shipmentId, issueId, payload, token) => {
    if (!payload) return;
    
    const url = ACTIVE_SHIPMENT_ISSUE.replace(':shipmentId',shipmentId);
    return axios.put(url.replace(':issueId',issueId),payload, authHeaders(token));
};

/** Remove a partner from an issue 
* @param {
*       partner: {
*           id: string
*           type: string    
*       }   
*} payload
*/
export const removePartnerIssue = (shipmentId, issueId, payload, token) => {
    if(!payload) return;
    let url = ACTIVE_SHIPMENT_ISSUE_PARTNERS.replace(':shipmentId', shipmentId);
    return axios.delete(url.replace(':issueId', issueId), {
        data: {partner: payload},
        ...authHeaders(token)
    });
}

/** Add a partner to an issue 
* @param {
*       partner: {
*           id: string
*           type: string    
*       }   
*} payload
*/
export const addPartnerIssue = (shipmentId, issueId, payload, token) => {
    if(!payload) return;
    let url = ACTIVE_SHIPMENT_ISSUE_PARTNERS.replace(':shipmentId', shipmentId);
    return axios.put(url.replace(':issueId', issueId), payload, authHeaders(token));
}
        

/** Get comments of an issue 
* @param {
*       sort: []
*       page: int
*       limit: int   
*} params
*/
export const getComments = (shipmentId, issueId, params, token) => {
    if(!issueId) return;
    let url = ACTIVE_SHIPMENT_ISSUE_COMMENTS.replace(':shipmentId', shipmentId);
    return axios.get(url.replace(':issueId', issueId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}
/** Create comments of an issue 
* @param {
*       type: string
*       content: string
*       attachment: string
*} payload
*/
export const createComment = (shipmentId, issueId, payload, token) => {
    if (!issueId) return;
    let url = ACTIVE_SHIPMENT_ISSUE_COMMENTS.replace(':shipmentId', shipmentId);
    return axios.post(url.replace(':issueId', issueId), payload, authHeaders(token));
}

/** get tasks of issue 
* @param {
*     shipmentId: string
*}params
*/

export const getTasksIssue = (shipmentId, token) => {
    if(!shipmentId) return;
    return axios.get(TASKS_ISSUE.replace(':shipmentId', shipmentId), authHeaders(token));
};
   
