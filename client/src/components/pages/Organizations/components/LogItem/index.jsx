import React from 'react';
import { ActivitiesHeader } from '../ActivitiesHeader';

import './index.scss';
import { PropTypes } from 'prop-types';

export const LogItem = ({log = []}) => {
	return (
        <>
		<div className="tr__activities-log-item">
            {log.length > 0 ? log.map((logData, logIndex) => {
                return  <div className="tr__activities-log-item__content mbx3" key={logIndex}>
                <ActivitiesHeader
                    className="pbx2"
                />
                {logData.activities.map((activity, activityIndex) => {
                    return  <div className="table--body d-flex justify-content-between" key={activityIndex} >
                    <div className="table--body__column name">
                        {activity.name}
                    </div>
                    <div className="table--body__column email">
                        {activity.email}
                    </div>
                    <div className="table--body__column activity">
                        {activity.activity}
                    </div>
                    <div className="table--body__column time">
                        {activity.dateTime}
                    </div>
                </div>
                })}
            </div>
            }) : ''}  
		</div>
        </>
	)
};

LogItem.propTypes = {
    log: PropTypes.array
};