import axios from 'axios';
import { authHeaders } from './auth';
import {
    BOOKINGS,
    BOOKING,
    BOOKING_DRAFT,
    BOOKING_STATUS,
    BOOKING_COLLABORATORS,
    BOOKING_COMMENTS,
    ACTIVITY_LOGS
} from './constants'


/** Get booking requests
 * @param {
 *      page: int
 *      limit: int
 *      loadingPort: string
 *      dischargePort: string
 *      dateOfReceiptFrom: string 
 *      dateOfReceiptTo: string
 *      createdDateFrom: string 
 *      createdDateTo: string 
 *      type: ['FCL', 'LCL']
 *      status: ['SUBMITTED', 'DRAFT', 'CONFIRMED', 'CANCELLED', 'REJECTED', 'DELETED']
 *      tab: ['RECEIVED', 'CREATED']
 *      requesters: string
 *      freightPartners: string
 *      query: string
 * } params
 */
export const getBookingRequests = (params, token) => {
    return axios.get(BOOKINGS, params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

/** Add new booking request
* @param {
*      creatorRole: string
*      type: string
*      containers: {
*           numberOfContainer: int
*           typeOfContainer: string
*      }
*      totalWeight: string
*      temperature: string
*      remark: string
*      numberOfPackage: string
*      numberOfPallet: string
*      totalOfColumn: string
*      placeOfReceipt: string
*      dateOfReceipt: timestamp
*      placeOfDelivery: string
*      exportAddress: string
*      importAddress: string
*      note: string
*      loadingPort: string
*      dischargePort: string
*      weightUnit: string
*      emptyAddress: string
*      dropAddress: string
*      saveAsDraft: boolean
*      freights: [
*           teamIds: [string]
*           organizationIds: [string]
*           memberIds: [string]
*      ]
* } payload 
*/
export const createBookingRequest = (payload, token) => {
    if (!payload) return;
    return axios.post(BOOKINGS, payload, authHeaders(token));
};

/** Get booking request
 * @param {
*      bookingId: int
* } params
*/
export const getBookingRequest = (bookingId, token) => {
    return axios.get(BOOKING.replace(':bookingId', bookingId), authHeaders(token));
};

/** Get activity logs
 * @param {
    *      bookingId: int
    * } params
    */
    export const getActivitylogs = (bookingId, token) => {
        return axios.get(ACTIVITY_LOGS.replace(':bookingId', bookingId), authHeaders(token));
    };

/** Update a booking request
* @param {
* } payload 
*/
export const updateBookingRequest = (bookingId, payload, token) => {
    if (!payload) return;
    return axios.put(BOOKING.replace(':bookingId', bookingId), payload, authHeaders(token));
};

/** Add new draft booking request
* @param {
*      creatorRole: string
*      type: string
*      containers: {
*           numberOfContainer: int
*           typeOfContainer: string
*      }
*      totalWeight: string
*      temperature: string
*      remark: string
*      numberOfPackage: string
*      numberOfPallet: string
*      totalOfColumn: string
*      placeOfReceipt: string
*      dateOfReceipt: {
*           specificDate: timestamp
*           fromDate: timestamp
*           toDate: timestamp
*      }
*      placeOfDelivery: string
*      exportAddress: string
*      importAddress: string
*      note: string
*      loadingPort: string
*      dischargePort: string
*      weightUnit: string
*      emptyAddress: string
*      dropAddress: string
*      saveAsDraft: boolean
* } payload 
*/
export const createDraftBookingRequest = (payload, token) => {
    if (!payload) return;
    return axios.post(BOOKING_DRAFT, payload, authHeaders(token));
};

/** Update status of a booking request
* @param {
*      bookingId: string
* } payload 
*/
export const updateBookingRequestStatus = (bookingId, payload, token) => {
    if (!payload) return;
    return axios.put(
        BOOKING_STATUS.replace(':bookingId', bookingId),
        payload,
        authHeaders(token)
    );
};

/** Update collaborators of a booking request
* @param {
*      bookingId: string
*      teamIds: [string]
*      organizationIds: [string]
*      memberIds: [string]
* } payload 
*/
export const updateBookingRequestCollaborators = (bookingId, payload, token) => {
    if (!payload) return;
    return axios.put(
        BOOKING_COLLABORATORS.replace(':bookingId', bookingId),
        payload,
        authHeaders(token)
    );
};

/** Get booking request comments
 * @param {
*      page: int
*      limit: int
* } params
*/
export const getBookingRequestComments = (bookingId, params, token) => {
    return axios.get(BOOKING_COMMENTS.replace(':bookingId', bookingId), params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

/** Add booking request comment
* @param {
*      content: string
*      files: [string]
* } payload 
*/
export const addBookingRequestComment = (bookingId, payload, token) => {
    if (!payload) return;
    return axios.post(
        BOOKING_COMMENTS.replace(':bookingId', bookingId),
        payload,
        authHeaders(token)
    );
};