import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { delayImport } from 'utils';

import './index.scss';
import { Breadcrum, Header } from 'components';
import { AuthContext, HomeContext } from 'contexts';
import {
  ACTIVE_SHIPMENTS_URL,
  ARCHIVE_URL,
  BOOKING_REQUEST_URL,
  NOT_FOUND_URL,
  ORGANIZATIONS_LIST_URL,
  ORGANIZATIONS_URL,
  OTHER_TEMPLATES_URL,
  PERSONAL_SETTINGS_URL,
  TEAMS_URL,
  TEAM_DETAILS_URL,
  TEMPLATES_URL,
  SHIPMENT_DETAILS,
  VESSEL_SCHEDULE_BASE_URL,
  TASKS_URL, ALL_TEAMS_URL,
} from 'actions';
import { userInfo } from 'os';

const Archive = delayImport(import('pages/Home/Archive'));
const AllIssues = delayImport(import('pages/Home/AllIssues'));
const TeamTabs = delayImport(import('pages/Home/TeamTabs'));

const PersonalSetting = delayImport(import('pages/UsersManagement/PersonalSetting'));

const TeamDetails = delayImport(import('pages/Teams/TeamDetails'));

const HomeLayout = () => {
    const location = useLocation();
    const { setIsArchive } = useContext(HomeContext);
    const { doGetUserInfo } = useContext(AuthContext);
    const [isBreadcrumb, setIsBreadcrumb] = useState(false);
    useEffect(() => {
        setIsArchive(location && location.pathname.indexOf('archive') > -1);
        setIsBreadcrumb(checkBreadcrumbAvailable());
    }, [location]);

    useEffect(() => {
        if (!userInfo) doGetUserInfo(null);
    }, [userInfo])

    const checkBreadcrumbAvailable = () => {
        const exceptions = [
            VESSEL_SCHEDULE_BASE_URL,
            ACTIVE_SHIPMENTS_URL,
            ARCHIVE_URL,
            ORGANIZATIONS_LIST_URL,
            TEAMS_URL,
            TEMPLATES_URL,
            OTHER_TEMPLATES_URL,
            BOOKING_REQUEST_URL,
            SHIPMENT_DETAILS
        ];
        return exceptions.some(e => location.pathname.indexOf(`${e.slice(1, e.length)}/`) > -1 || location.pathname === SHIPMENT_DETAILS);
    }

    return (
        <div className={`tr__home-layout ${isBreadcrumb ? 'having-breadcrumb' : ''}`}>
            <Header />
            {isBreadcrumb && (
                <Breadcrum />
            )}
            <div className="col-12">
                <Switch>
                    {/* Organization Routes */}
                    <Route path={ORGANIZATIONS_URL} exact>
                        <Redirect to={ORGANIZATIONS_LIST_URL} />
                    </Route>
                    <Route path={TEAM_DETAILS_URL} exact component={TeamDetails} />

                    {/* Personal Setting Routes */}
                    <Route path={PERSONAL_SETTINGS_URL} exact component={PersonalSetting} />

                    {/* Home Routes */}
                    <Route path="/" exact>
                        <Redirect to={ALL_TEAMS_URL} />
                    </Route>
                    <Route path={TASKS_URL} exact component={Archive} />
                    {/*<Route path={ALL_TEAMS_URL} exact component={AllIssues} />*/}
                    <Route path={ALL_TEAMS_URL} exact component={TeamTabs} />
                    <Route path="*">
                        <Redirect to={NOT_FOUND_URL} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
};

export default HomeLayout;
