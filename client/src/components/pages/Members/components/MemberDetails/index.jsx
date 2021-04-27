import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { TeamContext } from 'contexts';

export const MemberDetails = ({ title, member }) => {
    const { team } = useContext(TeamContext);

    const getMemberTeam = () => {
        const memberOrg = team && member && member.orgTeams ? member.orgTeams.find(org => org.orgId === team.organization._id) : null;
        return memberOrg ? memberOrg.teams.find(t => t.teamId === team._id) : null;
    }
    const formatStatus = status => status ? status.toString().toLowerCase() : '';
    const getMemberStatus = () => {
        const memberTeamStatus = getMemberTeam() ? getMemberTeam().status : '';

        return formatStatus(memberTeamStatus)
    }

    return (
        <div className="tr__member-details">
            {title && (
                <h4 className="h4 f-medium mbx3">{title}</h4>
            )}
            {member && (
                <div className="tr__member-details--info">
                    <div className="tr__member-details--info__item mbx3 d-flex">
                        <div className="col-4">  
                            <label className="f-medium">Name</label>
                        </div>
                        <div className="col-8">
                            <p className="item-value ">{member.name}</p>
                        </div>
                    </div>
                    <div className="tr__member-details--info__item mbx3 d-flex">
                        <div className="col-4">
                            <label className="f-medium">Email</label>
                        </div>
                        <div className="col-8">
                            <p className="item-value">{member.email}</p>
                        </div>
                    </div>
                    {/*<div className="tr__member-details--info__item mbx3 d-flex">*/}
                    {/*    <div className="col-4">*/}
                    {/*        <label className="f-medium">Contact number</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-8">*/}
                    {/*        <p className="item-value ">{member.primaryContactNumber}</p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="tr__member-details--info__item d-flex align-items-center">*/}
                    {/*    <div className="col-4">*/}
                    {/*        <label className="f-medium">User status</label>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-8">*/}
                    {/*        {getMemberTeam() && (*/}
                    {/*            <p className={`tr__tag ${getMemberStatus()}`}>{getMemberStatus()}</p>*/}
                    {/*        )}*/}
                    {/*    </div> */}
                    {/*</div>*/}
                </div>
            )}
        </div>
    )
};

MemberDetails.propTypes = {
    title: PropTypes.string,
    member: PropTypes.any
};
