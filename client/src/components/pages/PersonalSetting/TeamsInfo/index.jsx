import React, {useContext} from 'react';
import {PropTypes} from 'prop-types';

import './index.scss';
import {MemberContext} from 'contexts';
import {Button} from 'components';

export const TeamsInfo = ({
                            className = '',
                            handleLeave = () => {
                            },
                            isEdit = false
                          }) => {
  const {member} = useContext(MemberContext);

  const getMemberTeams = () => member && member.teams ? (member.teams) : [];

  return (
    <div className="tr__organization-information">
      <h4 className="h4 f-medium">Teams Information</h4>
      {getMemberTeams().length > 0 ? (
        <div
          className={`tr__task-header-organization mtx2 pbx2 f-medium d-flex align-items-center justify-content-between ${className}`}>
          <div className="column name">
            <p>Team name</p>
          </div>
          <div className="column partner">
            <p>Role</p>
          </div>
          <div className="column action">
            <p>Action</p>
          </div>
        </div>
      ) : (
        <p className="mtx2">You don't belong to any team.</p>
      )}

      {getMemberTeams() && getMemberTeams().map((team, teamIndex) => (
        <React.Fragment key={teamIndex}>
          <div className="table--body sub d-flex justify-content-between" key={teamIndex}>
            <div className="table--body__column name">
              {team.name}
            </div>
            <div className="table--body__column role text-capitalize">
              {(team.role || '').toLowerCase()}
            </div>
            <div className="table--body__column action">
              <Button
                className="outline icon"
                type="secondary"
                onClick={() => !isEdit && handleLeave(team._id, team.name)}
                disabled={isEdit}
              >
                Leave
              </Button>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
};

TeamsInfo.propTypes = {
  userOrganization: PropTypes.array,
  handleLeave: PropTypes.func,
  isEdit: PropTypes.bool
};
