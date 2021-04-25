import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {
  Datepicker,
  DetailInfo,
  DetailsTableHeader, Dropdown, Input,
  LogItem,
  MembersAvatar, Pie,
  Table,
  TableFooter,
  TableHeader,
  Tooltip
} from 'components';
import {logs, statusOptions, teamsHeader} from 'utils';
import {ALL_TEAMS_URL, ORGANIZATIONS_LIST_URL, TEAM_DETAILS_URL, TEAM_PAGE_SIZE} from 'actions';
import {useHistory} from "react-router-dom";
import {HomeContext, ManagementContext, ModalContext, TeamContext} from "../../../../../contexts";

export const TeamTasks = ({ backUrl = ALL_TEAMS_URL }) => {
  const history = useHistory();
  const {setAddTeam} = useContext(ModalContext);
  const [searchLoading, setSearchLoading] = useState(false);
  const {searchMessage} = useContext(HomeContext);
  const {
    setAddTask,
    setAssignCollaborators,
  } = useContext(ModalContext);
  const {
    setIsEditTask,
    setTaskId,
    setSelectTask,
    setTaskName,
  } = useContext(HomeContext);
  const {
    setIsDone,
  } = useContext(ManagementContext);
  const {
    teams,
    doGetTeams,
    currentPage,
    totalPages,
    totalTeams
  } = useContext(TeamContext);

  const columns = [
    {
      dataIndex: 'name,description',
      render: (name, description) => <DetailInfo info={{
        name,
        bio: description
      }}/>
    },
    {
      dataIndex: 'assignee',
      render: assignee => <MembersAvatar skip={5} members={[assignee]}/>
    },
    {
      dataIndex: 'status',
      render: (status, assignee) => {
        return (
          <Dropdown
            className="select"
            icon="icon-chevron-down"
            iconPosition="right"
            mode="select"
            placeholder="Choose status"
            dropdownPosition="center"
            options={statusOptions}
            value={statusOptions[Math.floor(Math.random() * statusOptions.length)]}
            renderLabel={selectedValue => (
              <div className="status-option">
                <p className={`task-status text-capitalize ${status.toLowerCase().replace(" ", '')}`}>
                  {status.toLowerCase()}
                </p>
                <Tooltip
                  renderContent={() => (
                    <div className="tags d-flex flex-column">
                      <span>{assignee.name}</span>
                      <small>Task Assignee</small>
                    </div>
                  )}
                >
                  <img
                    src="https://image.shutterstock.com/image-vector/some-bunny-loves-you-somebody-260nw-1903989307.jpg"
                    alt={assignee.name}/>
                </Tooltip>
              </div>
            )}
            render={(options, handleChange, selectedValue) => (
              <>
                {(status !== "Done") ? (
                  <div
                    className={`tr__status-dropdown disabled`}>
                    {options.map((option, optionIndex) => (
                      <div
                        className={`status-option ${status === option.key ? 'active' : ''}`}
                        key={optionIndex}
                        onClick={() => {
                          // handleChangeStatus(option, event.id)
                          alert('CHANGE STATUS')
                          handleChange(option)
                        }}
                      >
                        <p
                          className={`task-status text-capitalize ${option.key.toLowerCase()}`}>{option.value}</p>
                        <i className="icon-check"/>
                      </div>
                    ))}
                  </div>
                ) : ''}
              </>
            )}
          />
        )
      }
    },
    {
      dataIndex: 'dueDate',
      render: (status, dueDate) => (<div
        className="column date d-flex align-items-center justify-content-between">
        {status === "Done"
          ? (<Tooltip
            content={`${(new Date() - dueDate) < -1
              ? 'Done on time'
              : Math.abs(Math.floor((new Date().getTime() - dueDate) / 86400000)) + ' days completed after the deadline'}`}
          >
            <i className="icon-check"/>
          </Tooltip>)
          : new Date().getTime() - dueDate > 0
            ? (
              <Tooltip
                content={`${Math.abs(Math.floor((new Date().getTime() - dueDate) / 86400000))} days overdue`}
              >
                <i className="icon-warning"/>
              </Tooltip>
            )
            : (
              <Tooltip
                content={`${Math.abs(Math.floor((new Date().getTime() - dueDate) / 86400000))} days left until the deadline`}
              >
                <Pie
                  width={18}
                  height={18}
                  percentage={80}
                />
              </Tooltip>
            )}
        <Datepicker
          // start={new Date()}
          render={(value, onClick) => (
            <div className="tr__booking-date">
              <Input
                iconPosition="right"
                placeholder="Booking Date"
                value={dueDate}
                disabled={true}
              />
            </div>
          )}
        />
      </div>)
    }
  ]

  useEffect(() => {
    doGetTeams({
      page: 0,
      limit: TEAM_PAGE_SIZE,
      isSearching: true
    });
  }, [])
  /*eslint-enable */

  const showTaskDetails = team => {
    setAddTask(true);
    setIsEditTask(true);
    setSelectTask(task);
  }

  const handlePageChange = page => {
    doGetTeams({
      page,
      limit: TEAM_PAGE_SIZE
    });
  }

  const onTeamSearch = value => {
    const newParams = {
      page: 0,
      limit: TEAM_PAGE_SIZE,
      name: value,
      isSearching: true
    };
    if (value) newParams.name = value.trim();

    setSearchLoading(true);

    doGetTeams(newParams, () => {
      setSearchLoading(false);
    }, false);
  }

  return (
    <div className="tr__all-issues page-box">
      <h1 className="h1 f-medium mtbx2">All Teams</h1>
      <div className="tr__all-issues__card box">
        <Table
          className="teams border"
          dataSource={teams}
          columns={columns}
          onRowClick={showTaskDetails}
          emptyMessage={searchMessage ? searchMessage : 'No tasks found'}
        >
          <TableHeader
            items={teamsHeader}
            count={totalTeams}
            title='Tasks List'
            onAddButtonClick={() => setAddTeam(true)}
            labelButton="Add New Task"
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
  )
};

TeamTasks.propTypes = {
    backUrl: PropTypes.func
};
