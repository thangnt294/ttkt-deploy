import React, {useContext, useEffect} from 'react';

import './index.scss';
import {Datepicker, Dropdown, Input, Pie, ShipmentTaskHeader, Tooltip} from 'components';
import {statusOptions} from "../../../utils";
import {HomeContext, ModalContext} from "../../../contexts";
import {DONE, MINE, TASK_PAGE_SIZE} from "../../../actions";
import {TaskContext} from "../../../contexts/TaskContext";
import {Collaborators} from "../../../components/pages/TaskDetails/Collaborators";
import moment from "moment";

const Archive = () => {
  const {
    setIsEditTask,
    setTaskId,
    setSelectTask,
    setTaskName,
  } = useContext(HomeContext);
  const {
    setIsDone,
    doGetMyTasks,
    doUpdateTask,
    tasks,
    currentPage,
    totalPages
  } = useContext(TaskContext);

  /*eslint-disabled*/
  useEffect(() => {
    doGetMyTasks({
      page: 0,
      limit: TASK_PAGE_SIZE,
      isSearching: true
    });
  }, [])
  /*eslint-enabled*/

  const handleChangeStatus = (task, option) => {
    const {_id, base, team, ...taskClone} = task
    doUpdateTask(task._id, {
      ...taskClone,
      assignee: task.assignee._id,
      status: option.value
    }, () => doGetMyTasks({
        page: 0,
        limit: TASK_PAGE_SIZE,
        isSearching: true
      }
    ));
  }

  return (
    <div className="tr__all-issues page-box">
      <h1 className="h1 f-medium mtbx2">My Tasks</h1>
      <div className="tr__all-issues__card box">
        {/*<div className="tr__completed page-box">*/}
        <div className="tr__shipment-task-item--body">
          <ShipmentTaskHeader className="mbx1"/>
          {tasks && tasks.length > 0 && tasks.map(task => (
            <div key={task._id}>
              <div className='tr__shipment-task-item--table'>
                <div
                  className={`table--body d-flex table-body justify-content-between ${task.status === 'Done' ? 'done' : ''}`}
                  key={`${1}-event-${2}`}>
                  <div
                    className="column name d-flex align-items-center justify-content-between">
                    <h4 className="h4 f-medium">
                      <i className="icon-check"/>
                      {/* <span>{event.name}</span> */}
                      <span className="short-name" title={task.name}>{task.name}</span>
                    </h4>
                  </div>
                  <div
                    className="column team d-flex align-items-center justify-content-between">
                    <h4 className="h6 f-medium">
                      <span className="short-name" title={task.team.name}>{task.team.name}</span>
                    </h4>
                  </div>
                  <div className="column assignee">
                    <Collaborators
                      members={[task.assignee]}
                      skip={5}
                      onAdd={() => alert('ASSIGN TASK')}
                      // onAvatarsClick={() => handleAssignTask(task)}
                      done={task.status === 'Done'}
                    />
                  </div>
                  <div className="column status">
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
                          <p className={`task-status text-capitalize ${task.status.toLowerCase().replace(" ", '')}`}>
                            {task.status.toLowerCase()}
                          </p>
                          <Tooltip
                            renderContent={() => (
                              <div className="tags d-flex flex-column">
                                <span>{task.assignee.name}</span>
                                <small>Task Assignee</small>
                              </div>
                            )}
                          >
                            <img
                              src="https://image.shutterstock.com/image-vector/some-bunny-loves-you-somebody-260nw-1903989307.jpg"
                              alt={task.assignee.name}/>
                          </Tooltip>
                        </div>
                      )}
                      render={(options, handleChange, selectedValue) => (
                        <>
                          {(task.status !== "DONE") ? (
                            <div
                              className={`tr__status-dropdown`}>
                              {options.map((option, optionIndex) => (
                                <div
                                  className={`status-option ${task.status === option.key ? 'active' : ''}`}
                                  key={optionIndex}
                                  onClick={() => {
                                    handleChangeStatus(task, option)
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
                  </div>
                  <div
                    className="column date d-flex align-items-center justify-content-between">
                    {task.status === "Done"
                      ? (<Tooltip
                        content={`${(new Date() - task.dueDate) < -1
                          ? 'Done on time'
                          : Math.abs(Math.floor((new Date().getTime() - task.dueDate) / 86400000)) + ' days completed after the deadline'}`}
                      >
                        <i className="icon-check"/>
                      </Tooltip>)
                      : new Date().getTime() - task.dueDate > 0
                        ? (
                          <Tooltip
                            content={`${Math.abs(Math.floor((new Date().getTime() - task.dueDate) / 86400000))} days overdue`}
                          >
                            <i className="icon-warning"/>
                          </Tooltip>
                        )
                        : (
                          <Tooltip
                            content={`${Math.abs(Math.floor((new Date().getTime() - task.dueDate) / 86400000))} days left until the deadline`}
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
                            value={moment(task.dueDate).format('DD/MM/YYYY')}
                            disabled={true}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Archive;
