import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const AuthenticationHeader = ({ title, description }) => {
    return (
        <div className="tr__authentication--header mbx4">
            <h3 className="h2 f-medium">{title}</h3>
            {description && (
                <p className="mtx2">{description}</p>
            )}
        </div>
    )
}

AuthenticationHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}