import React, { useState, createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import './index.scss'

const TabContext = createContext();
const useTab = () => useContext(TabContext);

const TabNav = ({ childs, onTabClick }) => {
    const { activeTab, setTab } = useTab();

    const handleTabClick = (tabIndex, tabSlug) => {
        setTab(tabIndex);
        onTabClick(tabSlug);
    }

    return (
        <div className="tr__tabs--nav">
            <ul>
                {
                    childs.map((tab, tabIndex) => {
                        const currentTab = childs[tabIndex];
                        const { tabName, tabSlug } = currentTab.props;
                        return (
                            <li
                                className={activeTab === tabIndex ? 'active' : ''}
                                key={tabIndex}
                                onClick={() => handleTabClick(tabIndex, tabSlug)}
                            >
                                {tabName}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export const Tab = ({ className = '', initialTab = 0, onTabClick, animated = true, children }) => {
    const [activeTab, setActiveTab] = useState(null);
    const [isTabActivated, setIsTabActivated] = useState(false);
    const numTabs = React.Children.toArray(children);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    let timeout = null;

    const setTab = tabIndex => {
        if (activeTab !== tabIndex) {
            if (animated) {
                setIsTabActivated(false);
                timeout = setTimeout(() => {
                    setActiveTab(tabIndex);
                    setIsTabActivated(true);
                    clearTimeout(timeout);
                    setIsFirstLoad(false);
                }, isFirstLoad ? 0 : 300);
            } else {
                setActiveTab(tabIndex);
                setIsTabActivated(true);
            }
        }
    };

    /*eslint-disable */
    useEffect(() => {
        setTab(initialTab);
    }, [initialTab]);
    /*esline-enable */

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setTab
            }}
        >
            {numTabs.length > 0 && (
                <div className={`tr__tabs ${className}`}>
                    <TabNav childs={numTabs} onTabClick={onTabClick} />
                    <div className="tr__tabs--content">
                        <div className={`tr__tabs--content__item ${isTabActivated && 'active'}`}>
                            {numTabs[activeTab]}
                        </div>
                    </div>
                </div>
            )}
        </TabContext.Provider>
    )
};

Tab.propTypes = {
    initialTab: PropTypes.number,
    className: PropTypes.string,
    animated: PropTypes.bool
};

export const TabPane = ({ tabName, tabSlug = '', children }) => {
    return (
        <div className={`tr__tabs--content__item--pane`}>
            {children}
        </div>
    )
};

TabPane.propTypes = {
    tabName: PropTypes.string,
    tabSlug: PropTypes.string
};