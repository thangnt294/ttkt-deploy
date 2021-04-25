import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import InputRange from 'react-input-range';

export const RangeSlider = ({ min, max, from, to, onFormat, onChange }) => {

    return from <= to && min <= max ? (
        <InputRange
            minValue={min}
            maxValue={max}
            formatLabel={onFormat}
            allowSameValues={true}
            value={{
                min: from ? from : min,
                max: to ? to : max
            }}
            onChange={onChange}
        />
    ) : ''
};

RangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    from: PropTypes.number,
    to: PropTypes.number,
    onChange: PropTypes.func,
    onFormat: PropTypes.func
}