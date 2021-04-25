import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const ShipmentTaskHeader = ({ className = '' }) => {
    return (
        <div className={`tr__shipment-task-header d-flex align-items-center table-header justify-content-between ${className}`}>
            <div className="column name">
                <p>Task name</p>
            </div>
            <div className="column partner">
                <p>Team name</p>
                <i className="icon-filter" />
            </div>
            <div className="column assignee">
                <p>Assignee</p>
                <i className="icon-filter" />
            </div>
            <div className="column status">
                <p>Task status</p>
                <i className="icon-filter" />
            </div>
            <div className="column date">
                <p>Due date</p>
                <i className="icon-filter" />
            </div>
        </div>
    )
};

ShipmentTaskHeader.propTypes = {
    className: PropTypes.string
};
