import React from 'react';

export const TopHeader = ({title = ''}) => {
    return (
        <div className="tr__top-header mtx1 mbx4">
            <h1 className="tr__organizations--title h1 f-medium">{title}</h1>
        </div>
    )
};