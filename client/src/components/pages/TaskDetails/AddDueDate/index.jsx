import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Dropdown,
    CheckboxGroup,
    Datepicker
} from 'components';
import { dueDateOptions, dueDates, getErrorMessage } from 'utils';
import { HomeContext } from 'contexts';
import moment from 'moment';

export const AddDueDate = ({ title, register = () => {}, errors = [], setDayAjust, dayAjust, dateType, setDateType, eventTask, date, setDate, isEditTask  }) => {
    const { isTemplate } = useContext(HomeContext);
    const [eventBasedDate, setEventBasedDate] = useState(dueDateOptions[0])
    const isEventBased = () => dateType.id === 'event-based-date';
    const defaultDate = isEditTask ? (eventTask && eventTask.dueDate && eventTask.dueDate.specificDate && moment(eventTask.dueDate.specificDate).format('DD MMM YYYY')) : moment(new Date()).format('DD MMM YYYY')
    const defaultCheckbox = isEditTask ? (eventTask && eventTask.dueDate && eventTask.dueDate.specificDate ? dueDates[0] : dueDates[1]) : dueDates[0]
    const defaultTypeVesel = isEditTask ? (eventTask.dueDate && eventTask.dueDate.eventBasedDate && eventTask.dueDate.eventBasedDate.typeOfEvent === "VDL" ? dueDateOptions[0] : dueDateOptions[1]) : dueDateOptions[0]
    /*eslint-disable*/
    useEffect(() => {
        setDate(defaultDate)
    }, [eventTask])

    useEffect(() => {
        setDateType(defaultCheckbox)
    }, [eventTask])

    useEffect(() => {
        setEventBasedDate(defaultTypeVesel)
    }, [eventTask])
     /*eslint-enable*/
     
    return (
        <div className="tr__add-due-date">
            {title && (
                <h3 className="h3 f-medium mbx3">{title}</h3>
            )}
            <div className="row">
                {!isTemplate && (
                    <div className="col-12 col-sm-6">
                        <CheckboxGroup
                            name="dateTypes"
                            items={dueDates}
                            singleValue={true}
                            horizontal
                            refs={register()}
                            values={[dateType]}
                            onChange={types => setDateType(types[0])}
                        />
                    </div>
                )}
                {isEventBased() || isTemplate ? (
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-sm-6 d-flex align-items-end">
                                <Dropdown
                                    className="select w-100"
                                    icon="icon-chevron-down"
                                    iconPosition="right"
                                    mode="select"
                                    name="eventBasedDate"
                                    label={isTemplate ? 'Select event based date' : ''}
                                    options={dueDateOptions}
                                    value={eventBasedDate}
                                    onChange={option => setEventBasedDate(option)}
                                    refs={register({ required: true })}
                                    error={!!errors.eventBasedDate}
                                    errorMessage={getErrorMessage(errors.eventBasedDate, "Event Base Date")}
                                    placeholder="e.g. Event or Document"
                                    dropdownPosition="center"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12 col-sm-6">
                        <Datepicker
                            name="dueDate"
                            placeholder="Add due date"
                            refs={register({ required: true })}
                            error={!!errors.dueDate}
                            errorMessage={getErrorMessage(errors.dueDate, "Due Date")}
                            value={date}
                            onDatesChange={(date) => {
                                setDate(date);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
};

AddDueDate.propTypes = {
    title: PropTypes.string
}
