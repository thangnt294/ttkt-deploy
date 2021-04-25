import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Input, Dropdown } from 'components';
import { getErrorMessage, typeOfTask } from 'utils';
import { EVENT } from 'actions';

export const TaskDetails = ({ title, register = () => {}, errors = [], sectionTask = [], newEstSection, eventTask, isEditTask, setSectionType, sectionType, selectTask }) => {
    const [valueTypeTask, setValueTypeTask] = useState(typeOfTask[0]);
    const newValue =  ({
        key: selectTask ? selectTask.id : '', 
        value: selectTask ? selectTask.name : ''
    });
    const [taskName, setTaskName] = useState('');
    const defaultTaskName = isEditTask && eventTask && eventTask.name ? eventTask.name : '';

    /*eslint-disable*/
    useEffect(() => {
        setTaskName(defaultTaskName)
    }, [defaultTaskName])
    useEffect(() => {
        setSectionType(newValue)
    }, [eventTask, newEstSection]),
    useEffect(() => {
        setValueTypeTask(isEditTask ? (eventTask && eventTask.type && eventTask.type === EVENT ? typeOfTask[0] : typeOfTask[1]) : typeOfTask[0] )
    }, [eventTask])
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
                        </div>
                        <div className="col-12 col-sm-6">
                            <Dropdown
                                className="select"
                                icon="icon-chevron-down"
                                iconPosition="right"
                                mode="select"
                                name="typeOfTask"
                                label="Type of Task"
                                options={typeOfTask}
                                onChange={option => setValueTypeTask(option)}
                                value={valueTypeTask}
                                placeholder="e.g. Event or Document"
                                dropdownPosition="center"
                                refs={register({ required: true })}
                                error={!!errors.typeOfTask}
                                errorMessage={getErrorMessage(errors.typeOfTask, "task type")}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Dropdown
                                className="select"
                                icon="icon-chevron-down"
                                iconPosition="right"
                                mode="select"
                                name="taskSection"
                                label="Section"
                                options={sectionTask && sectionTask.length > 0 ? sectionTask.map(e => {
                                    return {
                                        key: e.id,
                                        value: e.name
                                    }
                                }) : []}
                                value={sectionType}
                                placeholder="Select section"
                                dropdownPosition="center"
                                refs={register({ required: true })}
                                onChange={option => setSectionType(option)}
                                error={!!errors.taskSection}
                                errorMessage={getErrorMessage(errors.taskSection, "task section")}
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