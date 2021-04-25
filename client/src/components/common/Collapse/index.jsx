import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Collapse = ({ className = '', title = '', collapseTitle = '', initialOpen = false, children, renderHeader, disableHeaderClick = false }) => {
    const [open, setOpen] = useState(initialOpen);

    const handleCollapse = () => !disableHeaderClick && setOpen(!open);

    return (
        <div className={`tr__collapse ${open ? 'active' : ''} ${className}`}>
            <div className="tr__collapse--title f-medium d-flex align-items-center justify-content-between" onClick={handleCollapse}>
                {renderHeader ? renderHeader() : (
                    <>
                        {title && (
                            <span>{title}</span>
                        )}
                        <p className="toggle-btn">
                            {collapseTitle && (
                                <>
                                    <span className="show f-medium">View {collapseTitle}</span>
                                    <span className="hide f-medium">Hide {collapseTitle}</span>
                                </>
                            )}
                            <i className="icon-chevron-down" />
                        </p>
                    </>
                )}
            </div>
            <div className="tr__collapse--content">
                {children}
            </div>
        </div>
    )
};

Collapse.propTypes = {
    className: PropTypes.string,
    initialOpen: PropTypes.bool,
    title: PropTypes.string,
    collapseTitle: PropTypes.string,
    renderHeader: PropTypes.func,
    disableHeaderClick: PropTypes.bool
};