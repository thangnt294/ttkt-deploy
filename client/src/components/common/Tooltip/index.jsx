import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Tooltip = ({ className = '', content, renderContent, position = 'left', children }) => {
    return (
        <div className={`tr__tooltip ${className} ${position} ${(content || renderContent) ? '' : 'hidden'}`}>
            <div className='tr__tooltip--content'>
                {children}
            </div>
            {(content || renderContent) && (
                <div className="tr__tooltip--popup">
                    {renderContent ? renderContent() : <div dangerouslySetInnerHTML={{ __html: content.replace(/(.{60})/g, "$1<br>") }}></div>}
                </div>
            )}
        </div>
    )
};

Tooltip.propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(['left', 'center', 'right']),
    content: PropTypes.string,
    renderContent: PropTypes.func
}