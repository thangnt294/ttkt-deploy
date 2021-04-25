import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import {
  Datepicker,
  DetailInfo,
  Input,
  MembersAvatar, Modal,
  Pie,
  Table,
  TableFooter, TableHeader,
  TabPane,
  Tooltip,
  TopHeader
} from 'components';
import {ALL_TEAMS_URL, TASK_DETAILS, TASK_PAGE_SIZE} from 'actions';
import {useHistory} from "react-router-dom";
import {TaskContext} from "../../../contexts/TaskContext";
import {Tab} from "../../../components/common/Tab";
import {tasksHeader} from "../../../utils";
import {ModalContext} from "../../../contexts";

export const TeamTasks = ({backUrl = ALL_TEAMS_URL}) => {
  const tabs = ['My Tasks', 'All Tasks'];
  const [isMyTasksTab, setIsMyTasksTab] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const {
    doGetTeamTasks,
    doGetMyTasks,
    currentPage,
    setCurrentPage,
    totalPages,
    totalTasks,
    tasks
  } = useContext(TaskContext);
  const {
    setAddTask
  } = useContext(ModalContext);
  const history = useHistory();
  const columns = [
    {
      dataIndex: 'name,description',
      render: (name, description) => <DetailInfo info={{
        name,
        bio: description
      }}/>
    },
    {
      dataIndex: 'team-name',
      render: team => <h6 className="h6">{team.name}</h6>
    },
    {
      dataIndex: 'assignee',
      render: assignee => <MembersAvatar skip={5} members={[assignee]}/>
    },
    {
      dataIndex: 'status',
      render: status => <div className="status-option">
        <p className={`task-status text-capitalize ${status.toLowerCase().replace(" ", '')}`}>
          {status.toLowerCase()}
        </p>
      </div>
    },
    {
      dataIndex: 'dueDate',
      render: (status, dueDate) =>
        <div className="column date d-flex align-items-center justify-content-between">
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
              )
          }
          <Datepicker
            // start={new Date()}
            render={() => (
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
        </div>
    }
  ];

  const showTaskDetails = task => {
    history.push(TASK_DETAILS.replace(':taskId', task._id));
  }

  const handlePageChange = page => {
    const params = {
      page,
      limit: TASK_PAGE_SIZE
    };

    if (searchValue) {
      params.name = searchValue;
    }

    if (isMyTasksTab) {
      doGetMyTasks(params);
    } else {
      doGetTeamTasks(params);
    }
  }

  const onTaskSearch = value => {
    const newParams = {
      page: 0,
      limit: TASK_PAGE_SIZE,
      isSearching: true
    };
    if (value) newParams.term = value.trim();

    setSearchLoading(true);
    setSearchValue(value);

    if (isMyTasksTab) {
      doGetMyTasks(newParams, () => {
        setSearchLoading(false);
      }, false)
    } else {
      doGetTeamTasks(newParams, () => {
        setSearchLoading(false);
      }, false);
    }
  };

  return (
    <div className="tr__organizations box d-flex flex-column page-box">
      <TopHeader title="Tasks"/>

      <div className="wrapper">
        <Tab
          className="minimal"
          initialTab={0}
          onTabClick={tab => {
            setCurrentPage(0);
          }}
          animated={false}
        >
          {tabs.map((tab, tabIndex) => (
            <TabPane
              key={tabIndex}
              tabName={tab}
              tabSlug={tab.toLowerCase().replace(' ', '')}
            >
              <Table
                className="border organizations"
                dataSource={tasks}
                columns={columns}
                onRowClick={showTaskDetails}
                emptyMessage='No task found'
              >
                <TableHeader
                  count={totalTasks}
                  items={tasksHeader}
                  onAddButtonClick={() => setAddTask(true)}
                  title=""
                  labelButton="Add New Organization"
                  onSearch={onTaskSearch}
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
            </TabPane>
          ))}
        </Tab>

      </div>
    </div>
  )
}

TeamTasks.propTypes = {
  backUrl: PropTypes.func
};
