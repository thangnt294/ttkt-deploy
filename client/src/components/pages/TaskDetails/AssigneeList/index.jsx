import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {Member} from '../Member';

export const AssigneeList = ({
                               className = '',
                               assignees = [],
                               isClosed,
                               characters,
                               onRemove = () => {
                               },
                               assignee
                             }) => {
  const [assigneeSearched, setAssigneeSearched] = useState(assignees);

  useEffect(() => {
    setAssigneeSearched(assignees)
  }, [assignees])

  return (
    <div className={`tr__assignee-list ${className}`}>
      <div className="list">
        <Member
          member={assignee}
          onRemove={onRemove}
          isClosed={isClosed}
          characters={characters}
        />
      </div>
    </div>
  )
};

AssigneeList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  assignees: PropTypes.array,
  skip: PropTypes.number,
  isClosed: PropTypes.bool,
  shipmentId: PropTypes.string,
  onRemove: PropTypes.func,
  hasOrgName: PropTypes.bool,
  characters: PropTypes.number
};
