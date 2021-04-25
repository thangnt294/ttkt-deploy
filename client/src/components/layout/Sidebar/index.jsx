import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './index.scss';

export const Sidebar = ({ links, setIsSearchingShipment, setSearchTerm, setSeachParamActive, setIdTemplate, setNoResultSearch}) => {
    return (
        <div className="tr__sidebar">
            <ul>
                {links.map((link, linkIndex) => (
                    <li
                        key={linkIndex}
                        onClick={() => {
                            setIsSearchingShipment(false);
                            setSearchTerm("");
                            setSeachParamActive("");
                            setIdTemplate("")
                            setNoResultSearch(false);
                        }}
                    >
                        <NavLink
                            className="tr__sidebar__link"
                            to={link.url}
                            exact={link.exact}
                        >
                            <p>
                                <span>{link.name}</span>
                            </p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
};

Sidebar.propTypes = {
    links: PropTypes.array
};
