import axios from 'axios';
import { authHeaders } from './auth';
import { 
    ACTIVE_SHIPMENT_TASKS, 
    ACTIVE_SHIPMENT_TASK_PARTNERS, 
    ACTIVE_SHIPMENT_TASK_STATUS,
    ACTIVE_SHIPMENT_STATUS, 
    ACTIVE_SHIPMENT_AS_TEMPLATE,
    ACTIVE_SHIPMENT_ADD_TASK_FTA
} from './constants';


/** Get list tasks of a shipment
*@param {
*   page: string
*   tab: string
*   limit: int
*} params
*/
export const getTasks = (shipmentId, params, token) => {
    if(!shipmentId) return;
    return axios.get(ACTIVE_SHIPMENT_TASKS.replace(':shipmentId', shipmentId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}

/** Change status of a shipment
*@param {
*   status: string
*} params
*/
export const changeStatusShipment = (shipmentId, params, token) => {
    if(!shipmentId) return;
    return axios.put(ACTIVE_SHIPMENT_STATUS.replace(':shipmentId', shipmentId), params, authHeaders(token));
}

/** Get list partners of a task
*@param {
*   shipmentId: string
*} params
*/

export const getTaskPartners = (taskId, token) => {
    if (!taskId) return;
    return axios.get(ACTIVE_SHIPMENT_TASK_PARTNERS.replace(':taskId', taskId), authHeaders(token))
}

/** Assign partners to a task 
*@param {
*    partners: [
*        {
*           id: string
*           type: string,
*           roles: [CONSIGNEE, PARTNER, IMPORT_CUSTOMS, EXPORT_CUSTOMS, SHIPPER, IMPORT_LOGISTICS, EXPORT_LOGISTICS]
*        }           
*    ]
* } payload
*/
export const assignTaskPartners = (taskId, payload, token) => {
    if (!taskId) return;
    return axios.post(ACTIVE_SHIPMENT_TASK_PARTNERS.replace(':taskId', taskId), payload, authHeaders(token));
}

/** Change status task 
* @param {
*      status : string
* } payload
*/ 
export const changeStatusTask = (taskId, payload, token) => {
    if (!payload) return;
    return axios.put(ACTIVE_SHIPMENT_TASK_STATUS.replace(':taskId', taskId), payload, authHeaders(token));
}

/** Save as template 
* @param {
*      id : string
* } params
*/ 
export const saveAsTemplate = (shipmentId, params, token) => {
    if (!shipmentId) return;
    return axios.post(ACTIVE_SHIPMENT_AS_TEMPLATE.replace(':shipmentId', shipmentId), params , authHeaders(token));
}

/** Remove a partner from task 
*@param {
*   id:  string    
*} payload
*/
export const removeTaskPartner = (taskId, payload, token) => {
    if (!taskId) return;
    return axios.delete(ACTIVE_SHIPMENT_TASK_PARTNERS.replace(':taskId', taskId), {
        data: payload,
        ...authHeaders(token)
    });
}

export const createTaskFta = (shipmentId, payload, token) => {
    if(!shipmentId) return;
    return axios.post(ACTIVE_SHIPMENT_ADD_TASK_FTA.replace(':shipmentId', shipmentId), payload, authHeaders(token));
}
