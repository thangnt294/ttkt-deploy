import React, {createContext, useContext} from 'react';

import {
    getUploadSignedURL,
    uploadPreSignedFile,
    getUploadedSignedFileUrl, OPERATION_FAILED_MESSAGE,
} from 'actions';
import {HomeContext} from "./HomeContext";

export const UploadFileContext = createContext();

export const UploadFileContextProvider = ({ children }) => {
    const {
        setLoading,
        setNotificationMessage,
        setNotificationType,
    } = useContext(HomeContext);

    const handleException = error => {
        const { data } = error.response;
        setLoading(false);
        setNotificationType('error');
        setNotificationMessage((data && (data.message || data.error)) || OPERATION_FAILED_MESSAGE);
    }

    const doUploadFile = async (params, file, loggedInUser) => {
        setLoading(true);

        try {
            const uploadSignedUrl = await getUploadSignedURL(params, loggedInUser);
            await uploadPreSignedFile(uploadSignedUrl.data.itemURI, uploadSignedUrl.data.method, file);
            const uploadedSignedFileUrl = await getUploadedSignedFileUrl(uploadSignedUrl.data.id, loggedInUser);
            return {
                id: uploadSignedUrl.data.id,
                name: `${uploadSignedUrl.config.params.fileName}.${uploadSignedUrl.config.params.fileExtension}`,
                url: uploadedSignedFileUrl.data.ret.downloadSignedURI.itemURI,
            }
        } catch (error) {
            handleException(error);
        }
    }

    return(
        <UploadFileContext.Provider
            value={{
                doUploadFile,
            }}
        >
            { children }
        </UploadFileContext.Provider>
    );
}
