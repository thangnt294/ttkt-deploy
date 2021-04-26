import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Input, Dropdown } from 'components';
import { getErrorMessage, typeOfTask } from 'utils';
import { EVENT } from 'actions';

export const TaskDetails = ({ title, register = () => {}, errors = [], eventTask, isEditTask, selectTask }) => {
    const [description, setDescription] = useState('');
    const [taskName, setTaskName] = useState('');
    const defaultTaskName = isEditTask && eventTask && eventTask.name ? eventTask.name : '';
    const defaultDescription = isEditTask && eventTask && eventTask.description ? eventTask.description : '';

    useEffect(() => {
        setTaskName(defaultTaskName)
    }, [defaultTaskName])
    /*eslint-enable*/

  useEffect(() => {
    setDescription(defaultDescription)
  }, [defaultDescription])
  /*eslint-enable*/

    return (
        <div className="tr__task-details">
            {title && (
                <h4 className="h4 f-medium mbx3">{title}</h4>
            )}
            <div className="row">
                <div className='col-12'>
                    <div className="row">
                        <div className="col-12">
                            <Input
                                label="Task Name"
                                className="mbx3"
                                name="taskName"
                                defaultValue={taskName}
                                refs={register({ required: true, maxLength: 200 })}
                                error={!!errors.taskName}
                                errorMessage={getErrorMessage(errors.taskName, "Task Name", "Task Name must not exceed 200 characters")}
                            />
                          <Input
                            label="Task Description"
                            className="mbx3"
                            name="description"
                            defaultValue={description}
                            refs={register({ required: true, maxLength: 200 })}
                            error={!!errors.description}
                            errorMessage={getErrorMessage(errors.description, "Task Description", "Task Description must not exceed 200 characters")}
                          />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

TaskDetails.propTypes = {
    title: PropTypes.string,
    sectionTask: PropTypes.array,
    sectionName: PropTypes.string
};
