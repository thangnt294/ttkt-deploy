import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const DetailInfo = ({ info }) => {
    return info ? (
        <div className="tr__organization-detail-info d-flex">
            {info.icon && (
                <i className={`mrx2 ${info.icon}`} />
            )}
            <div className="tr__organization-detail-info--main">
                <h6 className="h6 f-medium mbx1">{info.name}</h6>
                <span>{info.bio}</span>
            </div>
        </div>
    ) : '';
};

DetailInfo.propTypes = {
    info: PropTypes.object
}