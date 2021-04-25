import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import './index.scss';
import { Button, Input } from 'components';
import { DEBOUNCE_TIME } from 'actions';


export const DetailsTableHeader = ({
    label = '',
    rightLabel,
    onAddNewClick,
    title='',
    labelButton='',
    buttonAdd = true,
    backUrl = () => {},
    actionButton = true,
    isExportCSV,
    onSearch = () => {},
    debounceTime = DEBOUNCE_TIME,
    searchLoading = false,
}) => {
    const [searchTerm, setSearchTerm] = useState();

    const onInput = debounce(value => onSearch(value), debounceTime);

    return (
        <div className="tr__details-table-header d-flex align-items-center justify-content-between">
            <div className="tr__details-table-header__title d-flex align-items-center">
                {backUrl && (
                    <div className="tr__link tag mrx2 text-center" onClick={backUrl}>
                        <i className="icon-chevron-left mrx1"/>
                        <span className="f-medium">Back</span>
                    </div>
                )}
                <div>
                    <h2 className="h2 f-medium ">{title}</h2>
                    {label && <h6 className="h6 f-medium text-grey mtx1">{label}</h6> }
                </div>
            </div>
            {actionButton && <div className="d-flex align-items-center justify-content-between">
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
                {buttonAdd && (
                    <Button
                        className="icon"
                        onClick={onAddNewClick}
                    >
                        <i className="icon-plus" />
                        <span>{labelButton}</span>
                    </Button>
                )}

                {isExportCSV && (
                    <Button>
                        Export to CSV
                    </Button>
                )}
                </div>
            }
            {rightLabel && (
                <h6 className="h6 f-regular right-label">{rightLabel}</h6>
            )}
        </div>
    )
};

DetailsTableHeader.propTypes = {
    label: PropTypes.string,
    onAddNewClick: PropTypes.func,
    buttonAdd: PropTypes.bool,
    rightLabel: PropTypes.string,
    backUrl: PropTypes.func,
    onSearch: PropTypes.func,
    searchLoading: PropTypes.bool
};