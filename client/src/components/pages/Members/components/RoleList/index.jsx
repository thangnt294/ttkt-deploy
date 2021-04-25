import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { ItemCard } from 'components';

export const RoleList = ({
    title,
    note,
    name = 'teamRole',
    items = [],
    dropdownOptions = [],
    onRemove = () => {},
    register = () => {},
    errors = []
}) => {
    return (
        <div className="tr__role-list">
            {title && (
                <h4 className="h4 f-medium mbx3 d-flex align-items-center justify-content-between">
                    <span>{title}</span>
                    {note && (
                        <small>{note}</small>
                    )}
                </h4>
            )}
            <div className="tr__role-list--items">
                {items.map((item, itemIndex) => (
                    <ItemCard
                        key={itemIndex}
                        type="role"
                        item={item}
                        name={`${name}${item.id}`}
                        dropdownOptions={item.options || dropdownOptions}
                        onRemove={item => onRemove(item)}
                        isMember={false}
                        register={register}
                        errors={errors}
                        disabled={item.disabled}
                    />
                ))}
            </div>
        </div>
    )
};

RoleList.propTypes = {
    title: PropTypes.string,
    note: PropTypes.string,
    items: PropTypes.array,
    dropdownOptions: PropTypes.array,
    name: PropTypes.string,
    register: PropTypes.func,
    errors: PropTypes.any
};