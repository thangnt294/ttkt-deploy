import React from "react";
import PropTypes from 'prop-types';
import { Cropper } from 'react-cropper';

import 'cropperjs/dist/cropper.css';

import { Modal } from 'components';

export const ImageCropper = (
    {
        open = false,
        title = 'Image Cropper',
        message = '',
        rawImage = null,
        setImageCropped,
        onSubmit,
        onCancel,
    }
) => {
    const cropper = React.createRef();

    return (
        <Modal
            open={open}
            className='tr__image-cropper'
            title={title}
            btnClasses='justify-content-center'
            submitButton
            submitButtonLabel='Yes'
            onSubmitClick={onSubmit}
            cancelButton={true}
            cancelButtonLabel='No'
            cancelButtonClassNames='outline secondary'
            onCancelClick={onCancel}
            onCancel={onCancel}
        >
            <div>
                <h6 className="h6 mtbx2 f-medium">{message}</h6>
                <Cropper
                    src={rawImage}
                    aspectRatio={1}
                    ref={cropper}
                    autoCrop={false}
                    cropend={() => {setImageCropped(cropper.current.cropper.getCroppedCanvas().toDataURL())}}
                />
            </div>
        </Modal>
    );
}

ImageCropper.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    rawImage: PropTypes.string,
    setImageCropped: PropTypes.any,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
}
