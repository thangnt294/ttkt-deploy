import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Button } from 'components';
import { getRange, scrollToElement } from 'utils';

export const Pagination = ({ totalPages = 1, current = 1, onChange, anchorSelector = null }) => {
    const [pages, setPages] = useState([]);
    
    /*eslint-disable */
    useEffect(() => {
        if (totalPages > 0) {
            setPages(getRange(current, totalPages));
        }
    }, [totalPages, current]);
    /*eslint-enable */

    const handlePageChange = page => {
        onChange(page);

        // smooth scrolling to passed element
        scrollToElement(anchorSelector);
    }

    return pages.length > 1 ? (
        <div className="tr__pagination d-flex align-items-center">
            <Button
                className="icon circle"
                icon="icon-chevron-double-left"
                disabled={current === 0}
                onClick={() => handlePageChange(0)}
            />
            <Button
                className="icon circle"
                icon="icon-chevron-left"
                disabled={current === 0}
                onClick={() => handlePageChange(current - 1)}
            />
            {pages.map((page, pageIndex) => (
                <Button
                    key={pageIndex}
                    className={`circle ${current === page - 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(page - 1)}
                >
                    {page}
                </Button>
            ))}
            <Button
                className="icon circle"
                icon="icon-chevron-right"
                disabled={current >= totalPages - 1}
                onClick={() => handlePageChange(current + 1)}
            />
            <Button
                className="icon circle"
                icon="icon-chevron-double-right"
                disabled={current >= totalPages - 1}
                onClick={() => handlePageChange(totalPages - 1)}
            />
        </div>
    ) : null;
};

Pagination.propTypes = {
    totalPages: PropTypes.number,
    size: PropTypes.number,
    onChange: PropTypes.func,
    anchorElement: PropTypes.string
};