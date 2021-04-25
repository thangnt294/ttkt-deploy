import axios from 'axios';
import { authHeaders } from './auth';
import {
    TRACKER_MARK_ACTIVE_SHIPMENT,
    ACTIVE_SHIPMENT_ADD_SECTION,
    ACTIVE_SHIPMENT_EDIT_SECTION,
    ACTIVE_SHIPMENT_ADD_TASK,
    ACTIVE_SHIPMENT_INFO,
    ACTIVE_SHIPMENT_UPDATE_TASK,
    ACTIVE_SHIPMENTS,
    ACTIVE_SHIPMENT_NOTE,
    ACTIVE_SHIPMENT_HSCODE,
    ACTIVE_SHIPMENT_FTA_DETAILS,
} from './constants';

/** Get active shipments
 * @param {
*      page: int
*      limit: int
*      tab: string ['ALL', 'MYTASK']
* } params
*/
export const getActiveShipments = (params, token) => {
    return axios.get(ACTIVE_SHIPMENTS, params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

/** Create a mark as active shipment 
*  @param {
*   orgId : string,
*   creatorRole: string
*   status:  string
*   linkedShipmentId: string
*   shippingDetails : {
*       shipmentMode: string
*       shipmentType: string
*   }
*   containerTracking: string,
*   routes: {
*       shipperPickupAdd: strings
*       consigneeDeliveryAdd: strings
*       prepol: {
*           location: {
*               name: string
*               country: string
*               locode: string
*           },
*           date: string,
*           actual : boolean
*       }
*       pol: {
*           location: {
*               name: string
*               country: string
*               locode: string
*           },
*           date: string,
*           actual : boolean
*       }
*       pod: {
*           location: {
*               name: string
*               country: string
*               locode: string
*           },
*           date: string,
*           actual : boolean
*       }
*       postpod: {
*           location: {
*               name: string
*               country: string
*               locode: string
*           },
*           date: string,
*           actual : boolean
*       }
*   }
*   vessels : [
*      {
*          name: string
*          imo: int
*          voyage: null,
*          departure: string
*          arrival: string
*          departureDate: string
*          arrivalDate: string
*      } 
*   ]
*   bookingDetail: {
*       cardName: string
*       scacCode: string
*       confirmationNo: string
*       masterBoL: string
*       houseBoL: []
*   }
*   invoices : []
*   roleInShipments : [
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
export const createMarkAsActiveShipment = (payload, token) => {
    if(!payload) return;
    return axios.post(TRACKER_MARK_ACTIVE_SHIPMENT, payload, authHeaders(token));
};

/** Add new section to a shipment
* @param {
*      shipmentId: string
* } payload 
*/
export const addShipmentSection = (shipmentId, payload, token) => {
    if (!payload) return;
    return axios.post(ACTIVE_SHIPMENT_ADD_SECTION.replace(':shipmentId', shipmentId), payload, authHeaders(token));
};

/** Update section of a shipment
* @param {
*      sectionId: string
* } payload 
*/
export const updateShipmentSection = (sectionId, payload, token) => {
    if (!payload) return;
    return axios.put(ACTIVE_SHIPMENT_EDIT_SECTION.replace(':sectionId', sectionId), payload, authHeaders(token));
};

/** Delete a section from a shipment
* @param {
*      sectionId: string
* } payload 
*/
export const deleteShipmentSection = (sectionId, token) => {
    if (!sectionId) return;
    return axios.delete(ACTIVE_SHIPMENT_EDIT_SECTION.replace(':sectionId', sectionId), {
        ...authHeaders(token)
    });
};

/** Add new task to a section of a shipment
* @param {
*      sectionId: string
* } payload 
*/
export const addShipmentTask = (sectionId, payload, token) => {
    if (!payload) return;
    return axios.post(ACTIVE_SHIPMENT_ADD_TASK.replace(':sectionId', sectionId), payload, authHeaders(token));
};

/** delete task to a section of a shipment
* @param {
    *      taskId: string
    * } payload 
    */
    export const deleteShipmentTask = (taskId, token) => {
        if (!taskId) return;
        return axios.delete(ACTIVE_SHIPMENT_UPDATE_TASK.replace(':taskId', taskId), authHeaders(token));
    };

/** Get an shipment information
* @param {
*      shipmentId: string
* } payload 
*/
export const getShipmentInfo = (shipmentId, token) => {
    if (!shipmentId) return;
    return axios.get(ACTIVE_SHIPMENT_INFO.replace(':shipmentId', shipmentId), authHeaders(token));
};

export const updateShipmentTask = (taskId, payload, token) => {
    if(!payload) return;
    console.log(taskId)
    return axios.put(ACTIVE_SHIPMENT_UPDATE_TASK.replace(':taskId', taskId), payload, authHeaders(token));
}

export const updateShipmentInfo = (shipmentId, payload, token) => {
    if (!shipmentId) return;
    return axios.put(ACTIVE_SHIPMENT_INFO.replace(':shipmentId', shipmentId), payload, authHeaders(token));
};

/**
 * Update shipment note.
 *
 * @param {string} shipmentId
 * @param {{
 *     note: string
 * }} payload
 * @param {string} token
 */
export const updateShipmentNote = (shipmentId, payload, token) => {
    if (!shipmentId) return;
    return axios.put(ACTIVE_SHIPMENT_NOTE.replace(':shipmentId', shipmentId), payload, authHeaders(token));
};

/**
 * Update shipment note.
 *
 * @param {string} shipmentId
 * @param {{
 *      origin: string,
 *      destination: string,
 *      goodsType: string
 * }} params
 * @param {string} token
 */
export const getHsCodes = (shipmentId, params, token) => {
    if (!shipmentId) return;
    return axios.get(ACTIVE_SHIPMENT_HSCODE.replace(':shipmentId', shipmentId), params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

/**
 * Update shipment note.
 *
 * @param {string} shipmentId
 * @param {{
    *      origin: string,
    *      destination: string,
    * }} params
    * @param {string} token
    */
   export const getFtaDetails = (shipmentId, params, payload, token) => {
       if (!shipmentId) return;
       return axios.post(ACTIVE_SHIPMENT_FTA_DETAILS.replace(':shipmentId', shipmentId), payload, params ? {
           params,
           ...authHeaders(token)
       }: authHeaders(token));
   };