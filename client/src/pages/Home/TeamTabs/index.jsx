import React, {useContext, useEffect, useState} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';

import './index.scss';
import {AuthContext, HomeContext, ModalContext, TeamContext} from 'contexts';
import {Brand} from '../../Teams/Brand/index';
import {DetailInfo, MembersAvatar, Tab, Table, TableFooter, TableHeader, TabPane, TopHeader,} from 'components';
import {delayImport, teamsHeader} from 'utils';
import {
  ALL_TEAMS_URL,
  MINE,
  TEAM_DETAILS_URL,
  TEAM_PAGE_SIZE,
} from 'actions';

const TeamList = delayImport(import('pages/Teams/TeamList'));

const TeamTab = () => {
  const history = useHistory();
  const location = useLocation();
  const {searchMessage} = useContext(HomeContext);
  const { setAddTeam } = useContext(ModalContext);
  const {userInfo} = useContext(AuthContext);
  const {
    doGetTeams,
    teams,
    currentPage,
    setCurrentPage,
    totalPages,
    totalTeams
  } = useContext(TeamContext);

  const [isMyTeamTab, setIsMyTeamTab] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [searchLoading, setSearchLoading] = useState(false);

  const columns = [
    {
      dataIndex: 'name,description',
      render: (name, description) => <DetailInfo info={{
        name,
        bio: description
      }} />
    },
    {
      dataIndex: 'members',
      render: members => <MembersAvatar skip={5} members={members} />
    },
    {
      dataIndex: 'members',
      render: members => {
        const memberCount = members ? members.length : 0;
        const label = `${memberCount} member${memberCount === 1 ? '' : 's'}`;
        return (
          <h6 className="h6">{label}</h6>
        )
      }
    },
    {
      dataIndex: 'tasks',
      render: tasks => {
        const taskCount = tasks ? tasks.length : 0;
        const label = `${taskCount} task${taskCount === 1 ? '' : 's'}`;
        return (
          <h6 className="h6">{label}</h6>
        )
      }
    },
    {
      dataIndex: 'currentMemberRole',
      render: currentMemberRole =>
        <h6 className="h6 text-capitalize">{currentMemberRole}</h6>
    }
  ];

  /*eslint-disable */
  // useEffect(() => {
  //   doGetTeams({
  //     page: 0,
  //     limit: TEAM_PAGE_SIZE,
  //     isSearching: true
  //   });
  // }, [])

  useEffect(() => {
    doGetTeams({
      page: 0,
      limit: TEAM_PAGE_SIZE,
      memberId: userInfo?._id,
      isSearching: true
    });
  }, [])

  /*eslint-enable */

  const showTeamDetails = team => {
    history.push(TEAM_DETAILS_URL.replace(':teamId', team._id));
  }

  const handleTabChange = () => {
    if (isMyTeamTab) {
      doGetTeams({
        page: 0,
        limit: TEAM_PAGE_SIZE,
        isSearching: true
      });
    } else {
      doGetTeams({
        page: 0,
        limit: TEAM_PAGE_SIZE,
        memberId: userInfo._id,
        isSearching: true
      });
    }
    setIsMyTeamTab(!isMyTeamTab);
  }

  const handlePageChange = page => {
    const params = {
      page,
      limit: TEAM_PAGE_SIZE
    };

    if (searchValue) {
      params.name = searchValue
    }

    if (isMyTeamTab) {
      params.memberId = userInfo._id
    }

    doGetTeams(params);
  }

  const onTeamSearch = value => {
    const newParams = {
      page: 0,
      limit: TEAM_PAGE_SIZE,
      isSearching: true
    };
    if (value) newParams.term = value.trim();

    if (isMyTeamTab) {
      newParams.memberId = userInfo._id
    }

    setSearchLoading(true);
    setSearchValue(value);

    doGetTeams(newParams, () => {
      setSearchLoading(false);
    }, false);
  };

  return (
    <div className="tr__organizations box d-flex flex-column page-box">
      <TopHeader title="Teams"/>
      <Tab
        className="minimal"
        initialTab={isMyTeamTab ? 0 : 1}
        onTabClick={handleTabChange}
        animated={false}
      >
        <TabPane tabName="My Teams" tabSlug='my-teams'>
          <Switch>
            <Route path={ALL_TEAMS_URL}>
              <div className="tr__teams box d-flex flex-column page-box">
                <div className="wrapper">
                  <Table
                    className="teams border"
                    dataSource={teams}
                    columns={columns}
                    onRowClick={showTeamDetails}
                    emptyMessage={searchMessage ? searchMessage : 'No team found'}
                  >
                    <TableHeader
                      items={teamsHeader}
                      count={totalTeams}
                      title='Teams List'
                      onAddButtonClick={() => setAddTeam(true)}
                      labelButton="Add New Team"
                      onSearch={onTeamSearch}
                      searchLoading={searchLoading}
                    />
                  </Table>
                  {totalPages > 1 && (
                    <TableFooter
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={handlePageChange}
                    />
                  )}
                </div>
              </div>
            </Route>
          </Switch>
        </TabPane>
        <TabPane tabName="All Teams" tabSlug='all-teams'>
          <Switch>
            <Route path={ALL_TEAMS_URL} component={TeamList}/>
          </Switch>
        </TabPane>
      </Tab>
    </div>
  )
};

export default TeamTab;
