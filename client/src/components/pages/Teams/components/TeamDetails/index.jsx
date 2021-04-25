import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Input,DeleteBlock } from 'components';
import { getErrorMessage } from 'utils';
import { ModalContext, TeamContext } from 'contexts';

export const TeamDetails = ({
    isModalForm = true,
    children,
    isEditable = false,
    onInputChange = () => {},
    searchLoading = false,
    register = () => {},
    errors = [],
    reset = () => {},
    isNew = true,
    formState
}) => {
    const { team } = useContext(TeamContext);
    const { setDeleteTeam } = useContext(ModalContext);

    const [isEdit, setIsEdit] = useState(isEditable);

    /*eslint-disable */
    useEffect(() => {
        onInputChange();
    }, [])

    useEffect(() => {
        setIsEdit(isEditable);
    }, [isEditable])

    return (
        <>
        <div className={`tr__team-details ${isEdit ? '' : 'view-only'}`}>
            <div className="tr__team-details__main-content">
                {!isModalForm &&  <div className="h2 f-medium titleCard d-flex align-items-center">
                    {children}
                </div> }
               
                <div className={`tr__team-details--card row`}>
                    <div className={`${isModalForm ? 'col-12' : ''}`}>
                        <Input
                            label="Team Name"
                            name="teamName"
                            placeholder="Enter team name"
                            viewOnly={!isEdit}
                            refs={register({ required: true })}
                            defaultValue={team && team.name}
                            error={!!errors.name}
                            errorMessage={getErrorMessage(errors.name, "Team name")}
                        />
                    </div>
                    <div className="col-12">
                        <Input
                            label="Description"
                            placeholder="Enter description"
                            className="mbx3"
                            name="teamDescription"
                            viewOnly={!isEdit}
                            refs={register({ required: true })}
                            defaultValue={team && team.description}
                            error={!!errors.description}
                            errorMessage={getErrorMessage(errors.description, "Team description")}
                        />
                    </div>
                </div>
            </div>
            
            {!isModalForm && (
                <DeleteBlock
                    isEdit={isEdit}
                    buttonRightLabel="Edit"
                    buttonLeftLabel={"Delete Team"}
                    onLeftBtnClick={() => setDeleteTeam(true)}
                    onCancel={() => reset()}
                    className="outline icon"
                    icon="icon-pencil"
                    typeBtn="secondary"
                    onRightBtnClick={() => setIsEdit(true)}
                    setIsEdit={edit => setIsEdit(edit)}
                />
            )}
        </div>
    </>
    )
};

TeamDetails.propTypes = {
    isModalForm: PropTypes.bool,
    isEditable: PropTypes.bool,
    onSubmit: PropTypes.func,
    register: PropTypes.any,
    clearErrors: PropTypes.any,
    errors: PropTypes.any,
    onInputChange: PropTypes.func,
    searchLoading: PropTypes.bool,
    reset: PropTypes.func,
    isNew: PropTypes.bool,
    formState: PropTypes.any
};
