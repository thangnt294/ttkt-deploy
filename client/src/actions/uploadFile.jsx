import axios from 'axios';
import { authHeaders } from './auth';
import {
    GET_UPLOAD_URL_SIGNED_FILE,
    GET_UPLOADED_SIGNED_FILE_URL,
} from './constants'


/**
 * Get upload URL for upload signed file.
 *
 * @param {{
 *      fileName: string,
 *      subType: string,
 *      fileExtension: string,
 *      type: string
 * }} params
 * @param {string} token
 */
export const getUploadSignedURL = (params, token) => {
    return axios.get(GET_UPLOAD_URL_SIGNED_FILE, {
        params,
        ...authHeaders(token),
    });
};

/**
 * Upload file to S3 using pre-signed URL.
 *
 * @param {string} preSignedUrl
 * @param {string} method
 * @param {string} file
 */
export const uploadPreSignedFile = (preSignedUrl, method, file) => {
    /**
     * NOTE:
     * At here, using Fetch instead Axios because Axios will auto-generate 'Content-Type' header (but at origin not allow it).
     * Keep using Axios in another case, if you not have special case like this...
     * Please keep source code clean!
     */
    return fetch(preSignedUrl, {
        method,
        body: new Buffer(file.split(',')[1], 'base64'),
    });
}

/**
 * Get uploaded signed file URL.
 *
 * @param {string} fileId
 * @param {string} token
 */
export const getUploadedSignedFileUrl = (fileId, token) => {
    return axios.get(GET_UPLOADED_SIGNED_FILE_URL, {
        params: {
            fileName: fileId,
        },
        ...authHeaders(token),
    });
}
