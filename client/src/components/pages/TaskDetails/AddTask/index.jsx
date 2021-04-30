import React, {useContext, useEffect, useState} from 'react';

import './index.scss';
import {AddDueDate, Modal, MultiSelect, TaskDetails} from 'components';
import {HomeContext, MemberContext, ModalContext} from 'contexts';
import {useForm} from 'react-hook-form';
import {dueDateOptions, dueDates} from 'utils';
import moment from 'moment';
import {ALL, MEMBER_PAGE_SIZE, MYTASK, TASK_PAGE_SIZE} from 'actions';
import {useLocation, useParams} from 'react-router-dom';
import {TaskContext} from "../../../../contexts/TaskContext";
import {ItemCard} from '../ItemCard';
import {AssigneeList} from "../AssigneeList";

export const AddTask = ({open = false, onCancel}) => {
  const {
    isTemplate,
    isEditTask,
    sectionId,
    setNotificationMessage,
    eventTask,
    documentTask,
    selectTask,
    setIsEditTask,
    setCurrentTabManagement,
    currentTabManagement,
  } = useContext(HomeContext);

  const {
    doCreateTask,
    doUpdateTask,
    doGetTeamTasks,
    task,
    setTask,
    doDeleteTask
  } = useContext(TaskContext);

  const {
    members,
    doGetTeamMembers
  } = useContext(MemberContext);

  const [assignees, setAssignees] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const {setAddTask, setDeleteTask} = useContext(ModalContext);
  const {handleSubmit, register, errors, reset} = useForm();
  const [sectionType, setSectionType] = useState('')
  const [date, setDate] = useState(moment(new Date()).format('DD MMM YYYY'));

  const location = useLocation();
  const pathname = location.pathname.split('/');
  const teamId = pathname[pathname.length - 1];

  const handleAddTask = (data) => {
    const {taskName, description, dueDate} = data;

    const payload = {
      name: taskName?.trim(),
      description: description,
      dueDate: new Date(dueDate).getTime(),
      assignee: assignees[0]?.id,
      teamId: teamId,
      status: "PENDING"
    };


    doCreateTask(payload, () => {
      reset();
      setAssignees([])
      setAddTask(false);
      doGetTeamTasks({page: 0,
          limit: TASK_PAGE_SIZE,
          isSearching: true,
          teamId: teamId
        });
        // doGetUserInfo();
      setNotificationMessage(`
                <p> Task has been added successfully!</p>
                `);
      });
  }

  const handleEditTask = (data) => {
    const {taskName, description, dueDate} = data;
    const payload = {
      name: taskName.trim(),
      description: description,
      dueDate: new Date(dueDate).getTime(),
      assignee: task?.assignee?._id || null
    };

      doUpdateTask(task._id, payload, () => {
        setAddTask(false);
        setAddTask(false);
        setIsEditTask(false);
        if (currentTabManagement === ALL) {
          doGetTeamTasks({
            page: 0,
            tab: ALL,
            limit: TASK_PAGE_SIZE,
            isSearching: true,
            teamId: teamId
          })
        } else {
          doGetTeamTasks({
            page: 0,
            tab: MYTASK,
            limit: TASK_PAGE_SIZE,
            isSearching: true,
            teamId: teamId
          })
        }
        setCurrentTabManagement(ALL);
        setNotificationMessage(`
                    <p> Task has been updated successfully!</p>
                `);
      })

  }

  const handleDeleteTask = () => {
    setAddTask(false);
    doDeleteTask(task._id, teamId, () => {
      setNotificationMessage(`
                    <p> Task has been deleted!</p>
                `);
    })
  }

  const handleCloseModal = () => {
    reset();
    onCancel();
    setIsEditTask(false);
  }

  const handleChange = items => {
    setAssignees(items);
  }

  const handleRemove = item => {
    setAssignees(oldValue => [...oldValue.filter(val => val.id !== item.id)]);
  }

  const handleSearchMembers = (value) => {

    const params = {
      query: value.trim(),
      limit: MEMBER_PAGE_SIZE,
      page: 0,
      teamId: teamId,
      isSearching: true
    };

    setSearchLoading(true);
    doGetTeamMembers(params, () => {
      setSearchLoading(false);
    })
  }

  const handleRemovePartner = () => {
    setTask({
      ...task,
      assignee: null
    })
  }

  return (
    <Modal
      open={open}
      className="tr__add-task no-padding"
      onCancel={handleCloseModal}
      title={isEditTask ? 'Edit task' : 'Add New Task'}
      cancelButton={isEditTask}
      onCancelClick={handleDeleteTask}
      cancelButtonLabel="Delete Task"
      cancelButtonClassNames="outline"
      cancelButtonType="primary"
      btnClasses={isEditTask ? 'justify-content-between' : 'justify-content-end'}
      submitButton
      submitButtonLabel={isEditTask ? 'Save Changes' : "Save Task"}
      onSubmitClick={isEditTask ? handleSubmit(handleEditTask) : handleSubmit(handleAddTask)}
      isBackDropClickable={false}
      renderForm={children => (
        <form onSubmit={handleSubmit()}>
          {children}
        </form>
      )}
    >
      <TaskDetails
        title="Task Details"
        register={register}
        errors={errors}
        eventTask={task}
        documentTask={documentTask ? documentTask : ''}
        isEditTask={isEditTask}
        setSectionType={setSectionType}
        sectionType={sectionType}
        sectionId={sectionId}
        selectTask={selectTask}
      />
      <AddDueDate
        title="Due Date"
        register={register}
        errors={errors}
        eventTask={task}
        date={date}
        setDate={setDate}
        isEditTask={isEditTask}
      />
      <div className="tr__assign-modal--form px2">
        <MultiSelect
          className="mbx2"
          options={members && members.length > 0 ? members
            // .filter(collaborator => taskPartners.every(m => m.id !== collaborator._id))
            // .filter(collaborator => assignees.every(m => m.id !== collaborator._id) && !collaborator.base?.delete)
            .map(item => {
              return {
                id: item._id,
                icon: item.avatar,
                title: item.name,
                description: item.email
              }
            }) : []}
          value={assignees}
          addButton={assignees.length <= 0}
          addButtonLabel="Select"
          label={`Assign to task`}
          placeholder='You can search by name or email...'
          onChange={handleChange}
          onRemove={handleRemove}
          onInputChange={handleSearchMembers}
          searchLoading={searchLoading}
          // single={true}
          renderList={members => members.length > 0 && (
            <div className='tr__partners d-flex flex-wrap mtx1'>
                {members && members.length > 0 && members.map((member, memberIndex) => (
                    <ItemCard
                        key={memberIndex}
                        item={member}
                        onRemove={handleRemove}
                        cardOnly={true}
                    />
                ))}
                {task && task.assignee &&
                <ItemCard
                  item={task.assignee}
                  onRemove={handleRemove}
                  cardOnly={true}
                />}
            </div>
        )}
        />
      </div>
      <div className="tr__assign-modal--list px2">
        <AssigneeList
          title="Assigned"
          assignee={task ? task.assignee : null}
          onRemove={handleRemovePartner}
        />
      </div>
    </Modal>
  )
};
