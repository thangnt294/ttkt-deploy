import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { OPEN } from 'actions';

export const Table = ({
    className = '',
    dataSource = [],
    columns = [],
    onRowClick = () => {},
    emptyMessage = '',
    renderHeader,
    children
}) => {
    return (
        <>
            {renderHeader && renderHeader()}
            <div className={`tr__table ${className}`}>
                <div className="tr__table--header">
                    {children}
                </div>
                {dataSource.length > 0 && columns.length > 0 ? (
                    <>
                        {columns.some(column => column.title) ? (
                            <div className="tr__table--row d-flex justify-content-between">
                                {columns.map((column, columnIndex) => (
                                    <div className="tr__table--row__column header" key={columnIndex}>
                                        {column.title}
                                    </div>
                                ))}
                            </div>
                        ) : ''}
                        {dataSource.map((record, recordIndex) => (
                            <div
                                className={`tr__table--row d-flex justify-content-between ${record?.base?.delete ? 'disabled' : ''} ${record.status === OPEN ? 'done' : ''}`}
                                onClick={() => onRowClick(record)}
                                key={recordIndex}
                            >
                                {columns.map((column, columnIndex) => (
                                    <div className="tr__table--row__column" key={`${recordIndex}-${columnIndex}`}>
                                        {column.render
                                            ? (column.dataIndex && column.dataIndex.split(',').length > 1
                                                    ? column.render(...column.dataIndex.split(',').map(col => record[col]))
                                                    : column.render(record[column.dataIndex]))
                                            : record[column.dataIndex]}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                ) : <div className="no-result">
                        <p className="mlx1">{emptyMessage}</p>
                    </div>
                }
            </div>
        </>
    );
};

Table.propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array,
    onRowClick: PropTypes.func,
    renderHeader: PropTypes.func,
    emptyMessage: PropTypes.string
};