import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Dropdown } from 'components/common';

export const NotificationDropdown = ({notifications = [], options = []}) => {
    return (
        <div className="tr__notification-dropdown">
           <div className="tr__notification-dropdown__header d-flex align-items-center justify-content-between">
                <h4 className="h4 f-medium">Notification</h4>
                <p className="tr__link secondary d-flex align-items-center">
                    <i className="icon-check mrx1"/>
                    <span>Mark all as read</span>
                </p>
           </div>
           {notifications.map((notification, notificationIndex) => {
               return  <div className="tr__notification-dropdown__details" key={notificationIndex}>
                            <div className="time f-medium">{notification.time}</div>
                            {notification.detail.map((noticeDetail, indexNoticeDetail) => {
                                return <div
                                            className={`tr__notification-dropdown__details--items d-flex align-items-center justify-content-between ${notificationIndex === 0 ? 'unread' : ''}`}
                                            key={indexNoticeDetail}
                                        >
                                            <i className={`${noticeDetail.icon} mrx1 icon-notice ${indexNoticeDetail % 2 > 0 ? 'danger' : ''}`}/>
                                                <div className="content">
                                                    <p className="f-medium">{noticeDetail.name}</p>
                                                    <span className="f-medium">{noticeDetail.time} </span>
                                                </div>
                                                <Dropdown
                                                    mode="icon"
                                                    options={options}
                                                    dropdownPosition="left"
                                                >
                                                    <i className="icon-dots"/>
                                                </Dropdown>
                                        </div>
                            })}
                        </div>
           })}
        </div>
    )
};

NotificationDropdown.propTypes = {
    notifications: PropTypes.array,
    options: PropTypes.array
};