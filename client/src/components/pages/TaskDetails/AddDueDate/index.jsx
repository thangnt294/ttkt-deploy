import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {Datepicker} from 'components';
import {dueDates, getErrorMessage} from 'utils';
import moment from 'moment';

export const AddDueDate = ({
                             title, register = () => {
  }, errors = [], eventTask, date, setDate, isEditTask
                           }) => {
  const defaultDate = isEditTask ?
    (eventTask && eventTask.dueDate && eventTask.dueDate.specificDate && moment(eventTask.dueDate.specificDate).format('DD MMM YYYY'))
    : moment(new Date()).format('DD MMM YYYY')

  useEffect(() => {
    setDate(defaultDate)
  }, [eventTask])
  /*eslint-enable*/

  return (
    <div className="tr__add-due-date">
      {title && (
        <h3 className="h3 f-medium mbx3">{title}</h3>
      )}
      <div className="row">
        <div className="col-12 col-sm-6">
          <Datepicker
            name="dueDate"
            placeholder="Due date"
            refs={register({required: true})}
            error={!!errors.dueDate}
            errorMessage={getErrorMessage(errors.dueDate, "Due Date")}
            value={date}
            onDatesChange={(date) => {
              setDate(date);
            }}
          />
        </div>
      </div>
    </div>
  )
};

AddDueDate.propTypes = {
  title: PropTypes.string
}
