import React, {useContext, useState} from 'react';

import './index.scss';
import {AddDueDate, Modal, TaskDetails} from 'components';
import {HomeContext, ModalContext} from 'contexts';
import {useForm} from 'react-hook-form';
import {dueDateOptions, dueDates} from 'utils';
import moment from 'moment';
import {ALL, MYTASK} from 'actions';
import {useLocation} from 'react-router-dom';
import {TaskContext} from "../../../../contexts/TaskContext";

export const AddTask = ({open = false, onCancel}) => {
  const {
    isTemplate,
    isEditTask,
    sectionId,
    setNotificationMessage,
    sectionName,
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
    doGetTeamTasks
  } = useContext(TaskContext);

  const {setAddTask, setDeleteTask} = useContext(ModalContext);
  const {handleSubmit, register, errors, reset} = useForm();
  const [dayAdjust, setDayAdjust] = useState(1);
  const [roles, setRoles] = useState('');
  const [sectionType, setSectionType] = useState('')
  const [dateType, setDateType] = useState(dueDates[0]);
  const [eventBasedDate, setEventBasedDate] = useState(dueDateOptions[0]);
  const [date, setDate] = useState(moment(new Date()).format('DD MMM YYYY'));
  const location = useLocation();
  const pathnameArr = location.pathname.split('/');
  const shipmentId = pathnameArr[pathnameArr.length - 1];

  const handleAddTask = (data) => {
    const {taskName, typeOfTask, dueDate} = data;
    let selectedRole = [];
    roles.forEach(role => {
      selectedRole = [
        ...selectedRole,
        role.id.toUpperCase().replace('-', '_')
      ]
    })
    let selectedDueDate = {
      specificDate: new Date(dueDate).getTime(),
    }

    const payload = {
      taskName: taskName.trim(),
      type: typeOfTask.toUpperCase(),
      dueDate: selectedDueDate,
      roles: selectedRole,
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
    const {taskName, typeOfTask, dueDate} = data;

    const payload = {
      sectionId: sectionType.key,
      taskName: taskName.trim(),
      type: typeOfTask.toUpperCase(),
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
        eventTask={eventTask}
        documentTask={documentTask ? documentTask : ''}
        isEditTask={isEditTask}
        setSectionType={setSectionType}
        sectionType={sectionType}
        sectionId={sectionId}
        selectTask={selectTask}
      />
      <AddDueDate
        title="Add Due Date"
        register={register}
        errors={errors}
        eventTask={eventTask}
        setDateType={setDateType}
        dateType={dateType}
        date={date}
        setDate={setDate}
        isEditTask={isEditTask}
        eventBasedDate={eventBasedDate}
        setEventBasedDate={setEventBasedDate}
      />
    </Modal>
  )
};
