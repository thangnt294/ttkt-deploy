import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { isModalOpen, toggleModalBodyClass } from 'utils';

export const Spinner = ({ className = '', type = 'full' }) => {
    /*eslint-disable */
    useEffect(() => {
        toggleModalBodyClass(true);
        
        return () => {
            if (!isModalOpen()) toggleModalBodyClass(false);
        }
    }, []);
    /*eslint-enable */

    return (
        <div className={`tr__spinner ${type} ${className}`}>
            <div className="tr__spinner--icon"></div>
        </div>
    )
};

Spinner.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['full', 'transparent'])
}