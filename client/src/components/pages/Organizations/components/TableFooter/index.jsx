import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {
    Checkbox,
    Button,
    Pagination
} from 'components';

export const TableFooter = ({
    totalPages = 1,
    currentPage = 0,
    setCurrentPage = () => {},
    note,
    onlyPagination = true,
    selectAll = false,
    setSelectAll = () => {},
    selectedMembers = [],
    onRemove = () => {}
}) => {
	return (
        <div className={`tr__members-footer d-flex align-items-center ${onlyPagination && !note ? 'justify-content-end' : 'justify-content-between'}`}>
            {!onlyPagination && (
                <div className="remove-actions d-flex align-items-center">
                    <Checkbox
                        type='checkbox'
                        checked={selectAll}
                        label="Select all"
                        onChange={() => setSelectAll(!selectAll)}
                    />
                    <Button
                        className="outline"
                        type="danger"
                        disabled={!selectedMembers.length}
                        onClick={onRemove}
                    >
                        Remove
                    </Button>
                </div>
            )}

            {note && (
                <p className="note">{note}</p>
            )}

            <Pagination
                anchorElement="#members-list"
                current={currentPage}
                totalPages={totalPages}
                onChange={page => setCurrentPage(page)}
            />
        </div>
	)
};

TableFooter.propTypes = {
    onlyPagination: PropTypes.bool,
    totalPages: PropTypes.number,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number,
    selectAll: PropTypes.bool,
    setSelectAll: PropTypes.func,
    selectedMembers: PropTypes.array,
    onRemove: PropTypes.func,
    note: PropTypes.string
};