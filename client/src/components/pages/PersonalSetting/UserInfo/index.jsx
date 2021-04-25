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

    const addContactNumber = () => setMember(oldMember => {
        return {
            ...oldMember,
            contactNumber: [
                ...oldMember.contactNumber,
                ''
            ],
            primaryContactNumber: oldMember.primaryContactNumber ? oldMember.primaryContactNumber : 1
        }
    })

    const isPrimaryNumber = (pIndex, phoneNumber) => {
        if (!member) return false;
        return member.primaryContactNumber
            ? (member.primaryContactNumber === pIndex || (phoneNumber && member.primaryContactNumber === phoneNumber))
            : false;
    }

    const updatePrimaryNumber = (pIndex, phoneNumber) => setMember(oldMember => {
        return {
            ...oldMember,
            primaryContactNumber: phoneNumber ? phoneNumber : pIndex
        }
    })

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
                                name="fullName"
                                disabled={!isEdit}
                                refs={register({
                                    required: true,
                                    validate: val => !val.trim() ? 'This field cannot be blank' : undefined,
                                })}
                                defaultValue={member && member.name}
                                error={!!errors.fullName}
                                errorMessage={getErrorMessage(errors.fullName, "Full Name") || (errors.fullName ? errors.fullName.message : '')}
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
                        <div className="phone-number">
                            {member && member.contactNumber && member.contactNumber.length > 0 ? member.contactNumber.map((phoneNumber, pIndex) => (
                                <div className={`phone-number--field ${isEdit ? '' : 'd-flex align-items-end'}`} key={pIndex}>
                                    <Input
                                        className={isEdit ? 'mbx3' : ''}
                                        name={`phoneNumber${pIndex}`}
                                        label={pIndex === 0 ? "Contact number" : ''}
                                        disabled={!isEdit}
                                        refs={register({ required: false, validate: isPhoneNumber })}
                                        defaultValue={phoneNumber}
                                        maxLength={50}
                                        error={!!errors[`phoneNumber${pIndex}`]}
                                        errorMessage={getErrorMessage(errors[`phoneNumber${pIndex}`], "Contact number", "Invalid phone number")}
                                    />
                                    {isEdit ? (
                                        <Checkbox
                                            name={`primaryNumber${pIndex}`}
                                            type="checkbox"
                                            checked={isPrimaryNumber(pIndex + 1, phoneNumber)}
                                            refs={register()}
                                            label="Make Primary"
                                            className="toggle right"
                                            onChange={() => updatePrimaryNumber(pIndex + 1, phoneNumber)}
                                        />
                                    ) : (isPrimaryNumber(pIndex + 1, phoneNumber) && (
                                        <p className="task-status default f-medium">Primary</p>
                                    ))}
                                </div>
                            )) : (
                                <p>No contact number</p>
                            )}
                        </div>
                        <div className="mtx3">
                            {isEdit ? (
                                <p className='tr__link' onClick={addContactNumber}>
                                    <i className="icon-plus" />
                                    <span>Add {member && member.contactNumber && member.contactNumber.length > 1 ? 'more ' : ''}number</span>
                                </p>
                            ) : (
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
