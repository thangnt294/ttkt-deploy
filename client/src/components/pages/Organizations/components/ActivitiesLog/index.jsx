import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {DetailsTableHeader, LogItem, TableFooter} from 'components';
import {logs} from 'utils';
import {ALL_TEAMS_URL} from 'actions';

export const ActivitiesLog = ({backUrl = ALL_TEAMS_URL}) => {
  return (
    <div className="tr__activities-log">
      <div className="wrapper">
        <DetailsTableHeader
          title='Activities Log'
          buttonAdd={false}
          isExportCSV={true}
        />
        <div className="page-box">
          <LogItem log={logs.slice(0, 1)}/>
        </div>
      </div>
      <TableFooter/>
    </div>
  )
};

ActivitiesLog.propTypes = {
  backUrl: PropTypes.func
};
