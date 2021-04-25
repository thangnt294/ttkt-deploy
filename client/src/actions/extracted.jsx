import axios from 'axios';
import {
    OCR
} from './constants';

export const authHeaders = token => {
    return {
        headers: {
            'Authorization': token
        }
    }
}

/** Get ocr data by docId
* @param {
*      docId: string
* } payload 
*/
export const getOcrData = (docId, token) => {
    return axios.get(OCR.replace(':docId', docId), authHeaders(token));
};

/** Update ocr data
* @param {
*      docId: string
* } payload 
*/
export const updateOcrData = (docId, data, token) => {
    return axios.put(OCR.replace(':docId', docId), data, authHeaders(token));
};

/**
 * Get base64 from file url
 * @param {*} url 
 */
export const getBase64FromUrl = (url) => {
    return axios.get(url, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data, 'binary').toString('base64'));
}