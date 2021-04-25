import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './index.scss';
import { Button, Input } from 'components';
import { DEBOUNCE_TIME } from 'actions';

export const TableTabHeader = ({
    count = 0,
    items,
    actionButtons = true,
    actionSearch = true,
    searchLoading = false,
    title="",
    onAddButtonClick = () => {},
    onSearch = () => {},
    labelButton='',
    debounceTime = DEBOUNCE_TIME,
    children
}) => {
    const [searchTerm, setSearchTerm] = useState();

    const onInput = debounce(value => onSearch(value), debounceTime);

    return (
        <div className='tr__table-header d-flex align-items-center justify-content-between'>
            {items && (
                <>
                <div className="f-medium d-flex align-items-center">
                    <>
                    {children}
                    </>
                    <div className="mbx3 mlx2">
                        {count > 0 && (
                            <div className="tr__table-header--quantity h6 d-flex text-grey">
                                <p>{count}</p>
                                <span>{items.label}{count > 1 ? items.suffix || 's' : ''}</span>
                            </div>
                        )}
                    </div>
                </div>
                </>
            )}

            <div className="tr__table-header--filter d-flex align-items-center">
                {actionSearch && (
                    <Input
                        icon="icon-search"
                        iconPosition="right"
                        name="organizationSearch"
                        placeholder="Search"
                        onIconClick={() => onInput(searchTerm)}
                        loading={searchLoading}
                        onKeyPress={e => {
                            if (e.which === 13) onInput(searchTerm);
                        }}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                )}
                
                {actionButtons && (
                    <Button
                        className="icon"
                        onClick={onAddButtonClick}
                    >
                        <i className="icon-plus" />
                        <span>{labelButton}</span>
                    </Button>
                )}
            </div>
            
        </div>
    )
};

TableTabHeader.propTypes = {
    items: PropTypes.object,
    actionButtons: PropTypes.bool,
    actionSearch: PropTypes.bool,
    onAddButtonClick: PropTypes.func,
    count: PropTypes.number,
    onSearch: PropTypes.func,
    searchLoading: PropTypes.bool
};