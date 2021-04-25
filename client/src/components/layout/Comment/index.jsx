/**
 * Comment component.
 */

import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import './index.scss';
import DEFAULT_AVATAR from 'assets/images/default-avatar.png';

import { Button, Textarea, Modal, FileUploader, FilePreview } from 'components';
import { MAX_FILE_CMT_DOCS, MAX_SIZE_CMT_DOC } from "actions";

export const Comment = (
    {
        className = '',
        user = {
            name: 'You',
            avatar: DEFAULT_AVATAR,
        },
        isHaveAttachment = false,
        attachments,
        handleAddAttachments = () => {},
        handleCancelAddAttachments = () => {},
        handleRemoveAttachment = () => {},
        onSendComment = () => {},
        error,
        errorMessage,
    }
) => {
    const { register, formState, handleSubmit, reset, errors } = useForm();

    const [isAddAttachments, setIsAddAttachments] = useState(false);

    const handleSendComment = data => {
        onSendComment(data, () => {
            reset();
        });
    }

    return (
        <div className={`tr__comment mtx3`}>
            <div className={`${className}`}>
                <form className='d-flex' onSubmit={handleSubmit(handleSendComment)}>
                    <div className='user-avatar mrx2'>
                        <img src={user.avatar ? user.avatar : DEFAULT_AVATAR} alt={user.name} />
                    </div>
                    <div className='content'>
                        <h6 className='name h6 f-medium mbx1'>You</h6>
                        <div className='d-flex align-items-end'>
                            <Textarea
                                className='comment-textarea mrx4'
                                refs={ register({
                                    required: true,
                                    maxLength: 1000,
                                    validate: val => !val.trim() ? 'This field cannot be blank' : undefined,
                                }) }
                                name='comments'
                                placeholder='Add your comment...'
                                icon={{
                                    className: 'icon-paperclip',
                                    cursor: 'pointer',
                                    onClick: () => setIsAddAttachments(true),
                                }}
                                iconPosition='right'
                                error={error || !!errors.comments}
                                errorMessage={errorMessage || (errors.comments ? errors.comments.message : '')}
                            />
                            <Button
                                isSubmitBtn={true}
                                disabled={!formState.dirtyFields.comments}
                            >
                                Send
                            </Button>
                            {!!isHaveAttachment && (
                                <Modal
                                    className='uploader-wrapper'
                                    title='Upload documents'
                                    open={isAddAttachments}
                                    onCancel={() => {
                                        handleCancelAddAttachments();
                                        setIsAddAttachments(false);
                                    }}
                                    submitButton={true}
                                    submitButtonLabel='Upload'
                                    onSubmitClick={() => setIsAddAttachments(false)}
                                >
                                    <FileUploader
                                        className='uploader'
                                        mode='list'
                                        name='issueCommentDocuments'
                                        handleDrop={handleAddAttachments}
                                        uploadedFiles={attachments}
                                        refs={register}
                                        limitSizePerFile={MAX_SIZE_CMT_DOC}
                                        limitNumberUploadFile={MAX_FILE_CMT_DOCS}
                                        outputFormat='base64'
                                        fileTypeApproved={['image', 'word', 'excel', 'pdf']}
                                        handleRemove={handleRemoveAttachment}
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            <div className="d-flex mtx2">
                {attachments && attachments.map(file => (
                    <FilePreview
                        fileName={file.name}
                        fileExtension={file.name.split('.').pop()}
                        file={file.data}
                    />
                ))}
            </div>
        </div>
    );
}
