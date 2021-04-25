import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';

import './index.scss';
import { MemberContext } from 'contexts';
import { Button } from 'components';

export const OganizationsInfo = ({
    className='',
    handleLeave = () => {},
    isEdit = false
}) => {
    const { member } = useContext(MemberContext);

    const getMemberOrgs = () => member && member.orgTeams ? (member.orgTeams) : [];

    return (
        <div className="tr__organization-information">
            <h4 className="h4 f-medium">Organizations Information</h4>
            {getMemberOrgs().length > 0 ? (
                <div className={`tr__task-header-organization mtx2 pbx2 f-medium d-flex align-items-center justify-content-between ${className}`}>
                    <div className="column name">
                        <p>Organization name</p>
                    </div>
                    <div className="column partner">
                        <p>Role</p>
                    </div>
                    <div className="column action">
                        <p>Action</p>
                    </div>
                </div>
            ) : (
                <p className="mtx2">You don't belong to any organization or team.</p>
            )}

            {getMemberOrgs() && getMemberOrgs().map((org, orgIndex) => (
                <React.Fragment key={orgIndex}>
                    <div className="table--body d-flex justify-content-between">
                        <div className="table--body__column name f-medium text-uppercase">
                            {org.orgName}
                        </div>
                        <div className="table--body__column role text-capitalize">
                            {(org.roleName || '').toLowerCase()}
                        </div>
                        <div className="table--body__column action">
                            <Button
                                className="outline icon"
                                type="secondary"
                                onClick={() => !isEdit && handleLeave({
                                    orgIds: [org.orgId],
                                    orgNames: [org.orgName]
                                })}
                                disabled={isEdit}
                            >
                                Leave
                            </Button>
                        </div>
                    </div>
                    {org.teams && org.teams.length > 0 && (
                        <p className="title mtx2 pbx2 f-medium">Team name</p>
                    )}
        
                    {org.teams && org.teams.length > 0 && org.teams.map((team, teamIndex) => (
                        <div className="table--body sub d-flex justify-content-between" key={teamIndex} >
                            <div className="table--body__column name">
                                {team.teamName}
                            </div>
                            <div className="table--body__column role text-capitalize">
                                {(team.roleName || '').toLowerCase()}
                            </div>
                            <div className="table--body__column action">
                                <Button
                                    className="outline icon"
                                    type="secondary"
                                    onClick={() => !isEdit && handleLeave({
                                        teamIds: [team.teamId],
                                        teamNames: [team.teamName]
                                    })}
                                    disabled={isEdit}
                                >
                                    Leave
                                </Button>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
};

OganizationsInfo.propTypes = {
    userOrganization: PropTypes.array,
    handleLeave: PropTypes.func,
    isEdit: PropTypes.bool
};
