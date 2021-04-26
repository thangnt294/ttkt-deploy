import React, {useContext, useState} from 'react';

import './index.scss';
import {AddDueDate, Modal, MultiSelect, TaskDetails} from 'components';
import {HomeContext, MemberContext, ModalContext} from 'contexts';
import {useForm} from 'react-hook-form';
import {dueDateOptions, dueDates} from 'utils';
import moment from 'moment';
import {ALL, MEMBER_PAGE_SIZE, MYTASK} from 'actions';
import {useLocation} from 'react-router-dom';
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
    doGetMyTasks,
    doGetTeamTasks,
    task
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
  const [dateType, setDateType] = useState(dueDates[0]);
  const [eventBasedDate, setEventBasedDate] = useState(dueDateOptions[0]);
  const [date, setDate] = useState(moment(new Date()).format('DD MMM YYYY'));
  const location = useLocation();
  const pathnameArr = location.pathname.split('/');
  const shipmentId = pathnameArr[pathnameArr.length - 1];
  const [assigneeSearched, setAssigneeSearched] = useState(assignees);
  const [searchAssignee, setSearchAssignee] = useState(false);

  const handleAddTask = (data) => {
    const {taskName, description, dueDate} = data;
    let selectedDueDate = {
      specificDate: new Date(dueDate).getTime(),
    }

    const payload = {
      name: taskName.trim(),
      description: description,
      dueDate: selectedDueDate
    };


    doCreateTask(payload, () => {
      reset();
      setAddTask(false);
      setCurrentTabManagement(ALL);
      setNotificationMessage(`
                <p> Task has been added successfully!</p>
                `);
    });
  }

  const handleEditTask = (data) => {
    const {taskName, description, dueDate} = data;

    const payload = {
      taskName: taskName.trim(),
      description: description,
      dueDate: dueDate
    };

      doUpdateTask(shipmentId, eventTask.id, payload, () => {
        setAddTask(false);
        setAddTask(false);
        setIsEditTask(false);
        if (currentTabManagement === ALL) {
          doGetMyTasks(shipmentId, {
            page: 0,
            tab: ALL
          })
        } else {
          doGetTeamTasks(shipmentId, {
            page: 0,
            tab: MYTASK
          })
        }
        // setCurrentTabManagement(ALL);
        setNotificationMessage(`
                    <p> Task has been updated successfully!</p>
                `);
      })

  }

  const handleDeleteTask = () => {
    setAddTask(false);
    setDeleteTask(true);
  }

  const handleCloseModal = () => {
    reset();
    onCancel();
    setIsEditTask(false);
    setDateType(dueDates[0]);
  }

  const handleChange = items => {
    setAssignees(oldValue => [...oldValue, ...items.map(item => {
      return {
        ...item,
      }
    })]);
  }

  const handleRemove = item => {
    setAssignees(oldValue => [...oldValue.filter(val => val.id !== item.id)]);
  }

  const handleSearchMembers = (value) => {
    const pathname = location.pathname.split('/');
    const teamId = pathname[pathname.length - 1];
    const params = {
      query: value.trim(),
      limit: MEMBER_PAGE_SIZE,
      page: 0,
      teamId: teamId
    };

    setSearchLoading(true);
    doGetTeamMembers(shipmentId, params, () => {
      setSearchLoading(false);
    })
  }

  const handleRemovePartner = () => {

  }

  return (
    <Modal
      open={open}
      className="tr__add-task no-padding"
      onCancel={handleCloseModal}
      title={isTemplate ? 'Task Settings' : (isEditTask ? 'Edit task' : 'Add New Task')}
      cancelButton={isEditTask}
      onCancelClick={handleDeleteTask}
      cancelButtonLabel="Delete Task"
      cancelButtonClassNames="outline"
      cancelButtonType="primary"
      btnClasses={isTemplate || isEditTask ? 'justify-content-between' : 'justify-content-end'}
      submitButton
      submitButtonLabel={isTemplate || isEditTask ? 'Save Changes' : "Save Task"}
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
        dateType={dateType}
        date={date}
        setDate={setDate}
        isEditTask={isEditTask}
        eventBasedDate={eventBasedDate}
        setEventBasedDate={setEventBasedDate}
      />
      <div className="tr__assign-modal--form">
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
          value={members}
          addButton={true}
          addButtonLabel="Select"
          label={`Assign to task`}
          placeholder='You can search by name or email...'
          onChange={handleChange}
          onRemove={handleRemove}
          onInputChange={handleSearchMembers}
          searchLoading={searchLoading}
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
            </div>
          )}
        />
      </div>
      <div className="tr__assign-modal--list">
        <AssigneeList
          title="Assigned"
          assignee={task ? task.assignee : null}
          onRemove={handleRemovePartner}
        />
      </div>
    </Modal>
  )
};
