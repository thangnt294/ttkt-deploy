import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import avatar from 'assets/images/default-avatar.png';
import {
    Checkbox,
    Button,
    FileUploader,
    Input
} from 'components';
import { getErrorMessage, isEmail, isPhoneNumber } from 'utils';

import { DEFAULT_MAX_SIZE_UPLOAD } from 'actions';

export const UserInfo = ({
    isEdit,
    setIsEdit,
    register = () => {},
    errors = [],
    member,
    setMember,
    setAvatar,
}) => {

    const [files, setFiles] = useState([]);

    const handleFileUpload = file => {
        setFiles([...file]);
    }

    return (
        <div className="tr__user-info-form mbx3 ptbx4">
                <div className="tr__user-info-form__details">
                    <div className="d-flex align-items-center mbx4">
                        <div className="file-upload mrx3">
                            <FileUploader
                                mode="avatar"
                                multiple={false}
                                name="userLogo"
                                label="General Information"
                                imageUploadLabel="Change Profile Picture"
                                handleDrop={handleFileUpload}
                                uploadedFiles={files}
                                disabled={!isEdit}
                                defaultAvatar={member && member.avatar ? member.avatar : avatar}
                                refs={register()}
                                setAvatar={setAvatar}
                                fileTypeApproved={['image']}
                                limitNumberUploadFile={1}
                                limitSizePerFile={DEFAULT_MAX_SIZE_UPLOAD}
                            />
                        </div>
                        <div className="organization-name">
                            <Input
                                label="Full Name"
                                className="full-name"
                                name="name"
                                disabled={!isEdit}
                                refs={register({
                                    required: true,
                                    validate: val => !val.trim() ? 'This field cannot be blank' : undefined,
                                })}
                                defaultValue={member && member.name}
                                error={!!errors.name}
                                errorMessage={getErrorMessage(errors.name, "Full Name") || (errors.name ? errors.name.message : '')}
                            />
                        </div>
                    </div>
                    <Input
                        label="Email"
                        className={`email-user mbx2 pbx2 ${isEdit ? 'no-border' : ''}`}
                        name="email"
                        disabled={true}
                        refs={register({ required: true, validate: isEmail })}
                        maxLength="128"
                        defaultValue={member && member.email}
                        error={!!errors.email}
                        errorMessage={getErrorMessage(errors.email, "Email", "Invalid email format")}
                    />
                    <div className="contact-number">
                      <div className="mtx3">
                        {isEdit ? '' : (
                          <Button
                            className="outline icon"
                            icon="icon-pencil"
                            type="secondary"
                            onClick={() => setIsEdit(true)}
                          >
                            Edit
                          </Button>
                        )}
                      </div>
                        </div>
                    <div>
                </div>
            </div>
        </div>
    )
};

UserInfo.propTypes = {
    isEdit: PropTypes.bool,
    setIsEdit: PropTypes.func,
    register: PropTypes.any,
    errors: PropTypes.any,
    member: PropTypes.object,
    setMember: PropTypes.func,
    refs: PropTypes.any,
    setAvatar: PropTypes.func,
};
