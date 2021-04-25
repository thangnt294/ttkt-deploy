import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export const Pie = ({
    width = 100,
    height = 100,
    percentage = 40,
    bgColor = '#69A6FF',
    pieColor = '#D8D8D8'
}) => {
    return (
        <div className="tr__pie" style={{
            width,
            height,
            borderRadius: width,
            backgroundColor: percentage > 50 ? pieColor : bgColor,
            borderColor: bgColor
        }}>
           <div className="first" style={{
               borderWidth: width / 2,
               transform: `rotate(${(percentage > 50 ? 0 : ((percentage / 50) * 180)) - 45}deg)`,
               borderColor: percentage > 50 ? bgColor : pieColor
           }}></div> 
           <div className="second" style={{
               borderWidth: width / 2,
               transform: `rotate(${(percentage > 50 ? ((percentage / 50) * 180) : 0) - 45}deg)`,
               borderColor: percentage > 50 ? bgColor : pieColor
           }}></div> 
        </div>
    )
};

Pie.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    percentage: PropTypes.number,
    bgColor: PropTypes.string,
    pieColor: PropTypes.string
}



