import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {
    Checkbox
} from 'components';

export const Brand = ({
    brand,
    isSelectable = false,
    disabled = false,
    selectedMembers = [],
    setSelectedMembers = () => {}
}) => {
    return brand ? (
        <div className="tr__organization-brand d-flex align-items-center">
            {isSelectable && (
                <Checkbox
                    type='checkbox'
                    className={disabled ? 'disabled' : ''}
                    checked={selectedMembers.some(m => m === brand._id)}
                    onChange={() => !disabled && setSelectedMembers(oldMembers => {
                        const newMembers = oldMembers.filter(m => m !== brand._id);
                        if (newMembers.length < oldMembers.length) return [...newMembers];
                        else return [...oldMembers, brand._id];
                    })}
                />
            )}
            {brand.logo && (
                <img src={brand.logo} alt={brand.name} />
            )}
            <h6 className="h6 mlx1 f-medium" title={brand.name}>{brand.name}</h6>
        </div>
    ) : '';
};

Brand.propTypes = {
    brand: PropTypes.object,
    isSelectable: PropTypes.bool,
    selectedMembers: PropTypes.array,
    setSelectedMembers: PropTypes.func
}