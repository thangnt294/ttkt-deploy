import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const ActivitiesHeader = ({ className = '' }) => {
    return (
        <div className={`tr__activities-header f-medium d-flex align-items-center justify-content-between ${className}`}>
            <div className="column tr__activities-header__name">
                <p>Name</p>
                <i className="icon-filter" />
            </div>
            <div className="column tr__activities-header__email">
                <p>Email</p>
                <i className="icon-filter" />
            </div>
            <div className="column tr__activities-header__activity">
                <p>Activities</p>
                <i className="icon-filter" />
            </div>
            <div className="column tr__activities-header__date">
                <p>Date &amp; Time </p>
                <i className="icon-filter" />
            </div>
        </div>
    )
};

ActivitiesHeader.propTypes = {
    className: PropTypes.string
};