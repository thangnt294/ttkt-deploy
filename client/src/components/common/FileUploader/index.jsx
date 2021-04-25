/**
 * FIXME: Can't re-upload anymore image after the first time upload.
 * TODO: Improve drop file to upload feature.
 * TODO: Add limit size of files/ number of files when upload.
 * TODO: Add check file types allowed is an optional. (must is image type when upload with "avatar" mode)
 * TODO: Support multiple preview method.
 * TODO: Remove file from list file (optional).
 */

import React, { useRef, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import {
    Pie,
    Button,
    ImageCropper,
    FilePreview,
} from 'components';
import {
    getBase64DataFile,
    getBase64Image,
    sizeInMB,
} from 'utils';
import {
    DEFAULT_AVATAR,
    EXCEL_FILE_EXTENSION,
    IMAGE_FILE_EXTENSION,
    PDF_FILE_EXTENSION,
    WORD_FILE_EXTENSION,
} from 'actions';
import { HomeContext, UploadFileContext, AuthContext } from 'contexts';

export const FileUploader = ({
    className = '',
    mode = 'file',
    imageUploadLabel = 'Upload',
    multiple = true,
    name,
    label,
    type = 'regular',
    defaultAvatar = DEFAULT_AVATAR,
    refs,
    disabled = false,
    error,
    errorMessage,
    uploadedFiles = [],
    handleDrop,
    handleRemove,
    setAvatar,
    fileDisplayLimited = 4,
    outputFormat = 'file',
    limitSizePerFile,
    limitNumberUploadFile,
    fileTypeApproved,
    uploadInner = false,
    uploadFileType,
    uploadFileSubType,
    ocrRequired
}) => {
    const { setLoading } = useContext(HomeContext);
    const { doUploadFile } = useContext(UploadFileContext);
    const { loggedInUser } = useContext(AuthContext);

    const [isMultiple, setIsMultiple] = useState(multiple);
    const [limitNumberUpload, setLimitNumberUpload] = useState(limitNumberUploadFile);
    const [dragging, setDragging] = useState(false);
    const [dragCounter, setDragCounter] = useState(0);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageCropped, setImageCropped] = useState(null);
    const [rawImage, setRawImage] = useState(null);
    const [isOpenImageCropper, setIsOpenImageCropper] = useState(false);
    const [isError, setIsError] = useState(error);
    const [errorMsg, setErrorMsg] = useState(errorMessage);

    const dropRef = useRef(null);
    const inputRef = useRef(null);

    /*eslint-disable */
    // Override event listener of droppable file upload.
    useEffect(() => {
        const div = dropRef.current;
        div.addEventListener('dragenter', handleDragInAction);
        div.addEventListener('dragleave', handleDragOutAction);
        div.addEventListener('dragover', handleDragAction);
        div.addEventListener('drop', handleDropAction);

        return () => {
            div.removeEventListener('dragenter', handleDragInAction);
            div.removeEventListener('dragleave', handleDragOutAction);
            div.removeEventListener('dragover', handleDragAction);
            div.removeEventListener('drop', handleDropAction);
        }
    }, [uploadedFiles])

    // Trigger parse image to base64 format when upload an avatar.
    useEffect(() => {
        if (isAvatarUpload() && uploadedFiles && uploadedFiles.length) {
            getBase64Image(uploadedFiles[0], imageUrl => {
                setRawImage(imageUrl);
            })
            setIsOpenImageCropper(true);
        }
    }, [uploadedFiles])

    // Open cropper if image need crop.
    useEffect(() => {
        if (rawImage) {
            setIsOpenImageCropper(true);
        }
    }, [rawImage]);

    // Return avatar state to parent component after cropped image.
    useEffect(() => {
        if (previewImage) {
            setAvatar(previewImage);
        }
    }, [previewImage]);

    /**
     * Force "multiple" to false when mode is "avatar"
     * Force "limitNumberUploadFile" to 1 when mode is "avatar"
     */
    useEffect(() => {
        if (mode === 'avatar' && !multiple) {
            setIsMultiple(false);
            setLimitNumberUpload(1);
        }
    }, [mode]);

    useEffect(() => {
        if (isError) {
            setTimeout(() => {
                setIsError(false);
                setErrorMsg(null);
            }, 3000);
        }
    }, [isError, errorMsg]);
    /*eslint-enable */

    // Clear default behaviors of element.
    const removeDefaultBehaviors = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    // Clear default behavior when drag over uploader element.
    const handleDragAction = e => {
        removeDefaultBehaviors(e);
    }

    // Enable dragging state when drag enter uploader element.
    const handleDragInAction = e => {
        removeDefaultBehaviors(e);

        const { items } = e.dataTransfer;
        setDragCounter(dragCounter + 1);

        if (items && items.length > 0) {
            setDragging(true);
        }
    }

    // Disable dragging state when drag out uploader element.
    const handleDragOutAction = e => {
        removeDefaultBehaviors(e);

        setDragCounter(dragCounter - 1);
        if (!dragCounter) {
            setDragging(false);
        }
    }

    // Handle when drop file to uploader element.
    const handleDropAction = async e => {
        removeDefaultBehaviors(e);

        let files = [...e.dataTransfer.files || []];
        e.target.value = null;
        setDragging(false);

        // In case output files is "base64" format
        if (outputFormat === 'base64') {
            files = await Promise.all(Array.from(files).map(async file => {
                const data = await getBase64DataFile(file);

                return {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data,
                };
            }));
        }
        // !!! In case output files is "base64" format

        if (limitSizePerFile && !validateLimitSizeOfFiles(files)) {
            setIsError(true);
            setErrorMsg(`Max size of file can upload is ${sizeInMB(limitSizePerFile)}, please try again!`);
            return;
        }

        if (limitNumberUpload && !validateLimitNumberOfFiles(files)) {
            setIsError(true);
            setErrorMsg(`Max number of files can upload is ${limitNumberUpload}, please try again!`);
            return;
        }

        if (fileTypeApproved && fileTypeApproved.length && !validateFileTypesApproved(files)) {
            setIsError(true);
            setErrorMsg('File type is not supported!');
            return;
        }

        if (uploadInner && uploadFileType && uploadFileSubType) files = await triggerUploadToS3(files);

        setIsError(false);
        setErrorMsg('');

        if (files && files.length > 0) {
            handleDrop(files);
            // e.dataTransfer.clearData(0)          //==> This code line break in Firefox.
            setDragCounter(0);
        }
    }

    // Handle when simple upload file (open explorer and choose file).
    const handleUploadFiles = async e => {
        removeDefaultBehaviors(e);

        let files = [...e.target.files || []];
        e.target.value = null;
        // In case output files is "base64" format
        if (outputFormat === 'base64') {
            files = await Promise.all(Array.from(files).map(async file => {
                const data = await getBase64DataFile(file);

                return {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data,
                };
            }));
        }

        // !!! In case output files is "base64" format
        if (limitSizePerFile && !validateLimitSizeOfFiles(files)) {
            setIsError(true);
            setErrorMsg(`Max size of file can upload is ${sizeInMB(limitSizePerFile)}, please try again!`);
            return;
        }
        if (limitNumberUpload && !validateLimitNumberOfFiles(files)) {
            setIsError(true);
            setErrorMsg(`Max number of files can upload is ${limitNumberUpload}, please try again!`);
            return;
        }

        if (fileTypeApproved && fileTypeApproved.length && !validateFileTypesApproved(files)) {
            setIsError(true);
            setErrorMsg('File type is not supported!');
            return;
        }

        if (uploadInner && uploadFileType && uploadFileSubType) files = await triggerUploadToS3(files);

        setIsError(false);
        setErrorMsg('');

        if (files && files.length > 0) {
            handleDrop(files);
        }
    }

    const validateLimitSizeOfFiles = files => {
        for (let file of files) if (file.size > limitSizePerFile) return false;

        return true;
    }

    const validateLimitNumberOfFiles = files => {
        if (isAvatarUpload())
            return files.length <= limitNumberUpload;
        return (uploadedFiles.length + files.length) <= limitNumberUpload;
    }

    const validateFileTypesApproved = files => {
        let fileExtensionApproved = [];

        if (fileTypeApproved.includes('image')) fileExtensionApproved = fileExtensionApproved.concat(IMAGE_FILE_EXTENSION);
        if (fileTypeApproved.includes('word')) fileExtensionApproved = fileExtensionApproved.concat(WORD_FILE_EXTENSION);
        if (fileTypeApproved.includes('excel')) fileExtensionApproved = fileExtensionApproved.concat(EXCEL_FILE_EXTENSION);
        if (fileTypeApproved.includes('pdf')) fileExtensionApproved = fileExtensionApproved.concat(PDF_FILE_EXTENSION);

        for (let file of files) {
            if (!fileExtensionApproved.includes(file.name.toLowerCase().split('.').pop())) {
                return false;
            }
        }

        return true;
    }

    // Trigger open explorer for upload when click on uploader element.
    const triggerUpload = e => {
        e.preventDefault();

        // Do nothing if current uploaded file equal limit number file upload.
        if (mode !== 'avatar' && limitNumberUpload && uploadedFiles && uploadedFiles.length >= limitNumberUpload) return;

        inputRef.current.click();
    }

    // Trigger upload file to S3 when uploaded file to component.
    const triggerUploadToS3 = async files => {
        setLoading(true);

        files = await Promise.all(files.map(async file => {
            const { id, url } = await doUploadFile({
                type: uploadFileType,
                subType: uploadFileSubType,
                fileName: file.name.split('.').splice(0, -1).join('.'),
                fileExtension: file.name.split('.').pop(),
                ocrRequired: ocrRequired
            }, file.data, loggedInUser);

            return {
                ...file,
                id,
                url,
            };
        }));

        setLoading(false);
        return files;
    }

    const isAvatarUpload = () => mode === 'avatar';
    const isFileUpload = () => mode === 'file';
    const isListUpload = () => mode === 'list';
    const isInvoice = () => type === 'invoice';
    const isRegular = () => type === 'regular';

    return (
        <div className={`tr__file-uploader ${isListUpload() ? 'list' : ''} ${className} ${disabled ? 'disabled' : ''}`}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}

            {/*** Input element handle upload file ***/}
            <input
                type="file"
                name={name}
                ref={ref => {
                    inputRef.current = ref;
                    if (refs) refs(ref);
                }}
                onChange={handleUploadFiles}
                multiple={isMultiple}
            />
            {/*** Input element handle upload file ***/}

            <div className="tr__file-uploader--wrapper d-flex flex-column">
                <div
                    className={`tr__file-uploader--zone ${mode} ${previewImage ? '' : 'default'} ${dragging ? 'dragging' : ''}`}
                    ref={dropRef}
                    onClick={triggerUpload}
                >

                    {isAvatarUpload()
                        // When upload mode is "avatar"
                        ? (
                            <>
                                <div className={`img-wrapper ${isError ? 'error' : ''}`}>
                                    <img
                                        src={(uploadedFiles && uploadedFiles.length > 0 && previewImage) || defaultAvatar}
                                        alt={uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[0].name : 'Avatar'}
                                    />
                                </div>
                                <Button
                                    className="outline mtx1"
                                    type="secondary"
                                >
                                    {imageUploadLabel}
                                </Button>
                            </>
                        )
                        // !!! When upload mode is "avatar"

                        // Preview when upload mode isn't "avatar" & "list"
                        : !isListUpload() && uploadedFiles.length > 0 && (
                            <ul>
                                {uploadedFiles.slice(0, fileDisplayLimited).map((file, fileIndex) => (
                                    <li key={fileIndex}>
                                        <FilePreview
                                            fileName={file.name}
                                            fileExtension={file.name.split('.').pop()}
                                            file={file.data}
                                        />
                                        <span>{file.name}</span>
                                    </li>
                                ))}
                                {uploadedFiles.length > fileDisplayLimited && (
                                    <p className="mtx1">{uploadedFiles.length - fileDisplayLimited} more file(s)</p>
                                )}
                            </ul>
                        )
                        // !!! Preview when upload mode isn't "avatar" & "list"
                    }

                    {/*** Show droppable file area when mode is "file" or "list" ***/}
                    {(isFileUpload() || isListUpload()) && (uploadedFiles.length < limitNumberUpload) && (
                        <div className={`message d-flex flex-column align-items-center justify-content-center ${!uploadedFiles.length ? 'w-100' : ''}`}>
                            <i className='icon-upload mbx2' />
                            <p className="f-medium">Drag file or Select from your folder</p>
                        </div>
                    )}
                    {/*** !!! Show droppable file area when mode is "file" or "list" ***/}

                </div>

                {/*** Error view context!!! ***/}
                <p className={`error ${isError && errorMsg && 'active'}`}>{errorMsg}</p>
            </div>

            {/*** Preview uploaded files ***/}
            {isListUpload() && uploadedFiles.length > 0 && (
                <ul className={`tr__file-list ${type}`}>
                    {uploadedFiles.map((file, fileIndex) => (
                        <li key={fileIndex}>
                            {handleRemove && (
                                <i className="icon-times remove-icon" onClick={() => handleRemove(file)} />
                            )}
                            {/*<i className="icon-file" />*/}
                            <FilePreview
                                fileName={file.name}
                                fileExtension={file.name.split('.').pop()}
                                file={file.data}
                            />
                            <div className="info">
                                <h5 className={`h5 f-medium ${isRegular() ? 'mbx1' : ''}`}>
                                    {isInvoice() && (
                                        <span className="f-medium label text-capitalize mrx1">{type}:</span>
                                    )}
                                    <span>{file.name || file.fileName}</span>
                                </h5>
                                {isRegular() && (
                                    <p>{sizeInMB(file.size)}</p>
                                )}
                            </div>
                            <div className="progress">
                                <p className="f-medium mrx1">100%</p>
                                <Pie
                                    width={20}
                                    height={20}
                                    percentage={100}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/*** !!! Preview uploaded files ***/}

            {/*** Image cropper ***/}
            {isAvatarUpload() && uploadedFiles && (
                <ImageCropper
                    open={isOpenImageCropper}
                    rawImage={rawImage}
                    setImageCropped={setImageCropped}
                    onSubmit={() => {
                        if (imageCropped) {
                            setPreviewImage(imageCropped);
                            setImageCropped(null);
                        } else {
                            setPreviewImage(rawImage);
                        }
                        setIsOpenImageCropper(false)
                    }}
                    onCancel={() => { setIsOpenImageCropper(false) }}
                />
            )}
            {/*** !!! Image cropper ***/}
        </div>
    )
};

FileUploader.propTypes = {
    className: PropTypes.string,
    mode: PropTypes.oneOf(['avatar', 'file', 'list']),
    imageUploadLabel: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['regular', 'invoice']),
    error: PropTypes.any,
    errorMessage: PropTypes.string,
    uploadedFiles: PropTypes.any,
    handleDrop: PropTypes.func,
    handleRemove: PropTypes.func,
    refs: PropTypes.any,
    defaultAvatar: PropTypes.any,
    setAvatar: PropTypes.func,
    fileDisplayLimited: PropTypes.number,
    outputFormat: PropTypes.oneOf(['file', 'base64']),
    limitSizePerFile: PropTypes.number,                                     // => unit: byte
    limitNumberUploadFile: PropTypes.number,
    fileTypeApproved: PropTypes.array,
    uploadInner: PropTypes.bool,
    uploadFileType: PropTypes.string,
    uploadFileSubType: PropTypes.string,
}
