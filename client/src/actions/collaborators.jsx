import axios from 'axios';
import { authHeaders } from './auth';
import { ACTIVE_SHIPMENT_COLLABORATORS } from './constants';

/** Create collaborators
* @param {
*      roleInShipments : [
*       {
*           roleType: string,
*           partners: [
*               {
*                   partnerId: string,
*                   type: string
*               }
*           ]  
*       }
*   ]  
*} payload
*/
export const createCollabrator = (shipmentId, payload, token) => {
    if (!payload) return;
    return axios.post(ACTIVE_SHIPMENT_COLLABORATORS.replace(':shipmentId', shipmentId), payload, authHeaders(token));
};

/** Get list collaborators
*@param {
*   type: string
*   role: string
*   page: int
*   limit: int
*} params
*/
export const getCollaborators = (shipmentId, params, token) => {
    if(!shipmentId) return;
    return axios.get(ACTIVE_SHIPMENT_COLLABORATORS.replace(':shipmentId', shipmentId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}
/** Remove a collaborator 
*@param {
*   id: string
*} payload
*/
export const removeCollaborator = (shipmentId, payload, token) => {
    if (!shipmentId) return;
    return axios.delete(ACTIVE_SHIPMENT_COLLABORATORS.replace(':shipmentId', shipmentId), {
        data: payload,
        ...authHeaders(token)
    });
}