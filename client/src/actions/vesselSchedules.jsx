import axios from 'axios';
import { authHeaders } from './auth';
import {
    GET_VESSEL_SCHEDULE
} from './constants'


/** Get Vessel Schedules
 * @param {
 *      origin: string
 *      destination: string
 *      departure: boolean
 *      arrival: boolean
 *      nearestDate: int 
 *      dateRange: string
 *      pickupDate: int 
 *      deliveryDate: int 
 *      providers: string
 *      duaration: string
 *      desPort: string
 * } params
 */
export const getVesselSchedules = (params, token) => {
    return axios.get(GET_VESSEL_SCHEDULE, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};
