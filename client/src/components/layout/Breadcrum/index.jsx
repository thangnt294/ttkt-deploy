import { HomeContext } from 'contexts';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export const Breadcrum = () => {
    const { breadcrums } = useContext(HomeContext);

    return breadcrums && breadcrums.length > 0 ? (
        <ul className="tr__breadcrum d-flex align-items-center">
            {breadcrums.map((b, bIndex) => bIndex === 0 ? (
                <li className="d-flex align-items-center mrx1" key={bIndex}>
                    <Link to={b.url}>
                        {b.name}
                    </Link>
                </li>
            ) : (
                <li className={`d-flex align-items-center mrx1 ${bIndex === breadcrums.length - 1 ? 'active' : ''}`} key={bIndex}>
                    <i className="icon-chevron-right mrx1" />
                    <Link to={b.url}>
                        <span>{b.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    ) : '';
}