import React, {createContext, useContext, useState} from 'react';

import {OPERATION_FAILED_MESSAGE, TASK_PAGE_SIZE, TEAM_PAGE_SIZE,} from 'actions';
import {AuthContext, HomeContext} from 'contexts';
import {createTask, deleteTask, getMyTasks, getTask, getTeamTasks, updateTask} from "../actions/tasks";

export const TaskContext = createContext();

export const TaskContextProvider = ({children}) => {
  const {setLoading, setNotificationMessage, setSearchMessage, setNotificationType} = useContext(HomeContext);
  const {loggedInUser, userInfo, doGetUserInfo} = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleException = error => {
    const {data} = (error.response || {});
    setLoading(false);
    setNotificationType('error');
    setNotificationMessage((data && (data.message || data.error)) || OPERATION_FAILED_MESSAGE);
  }

  const doGetMyTasks = async (params, callback, errorCallBack, hasLoading = true) => {
    setTask(null);

    if (tasks.length === 0 || currentPage !== params.page || params.isSearching) {
      try {
        if (hasLoading) setLoading(true);
        delete params.isSearching;

        const response = await getMyTasks(params, loggedInUser);
        const {data, status} = response;
        if (status === 200) {
          console.log(data.items)
          setTasks(data.items || []);
          setTotalPages(data.totalPage);
          setCurrentPage(data.currentPage);
          if (callback) callback();
          if (!data.items.length) {
            if (errorCallBack) errorCallBack();
          }
          if (params.name) setSearchMessage('No search result')
          else {
            setTotalTasks(data.totalItems);
            setSearchMessage('');
          }
        }

        if (hasLoading) setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doGetTeamTasks = async (params, callback, hasLoading = true) => {
    setTask(null);

    if (tasks.length === 0 || currentPage !== params.page || params.isSearching) {
      try {
        if (hasLoading) setLoading(true);
        delete params.isSearching;

        const response = await getTeamTasks(params, loggedInUser);
        const {data, status} = response;

        if (status === 200) {
          setTasks(data.items || []);
          setTotalPages(data.totalPage);
          setCurrentPage(data.currentPage);
          if (callback) callback();
          if (params.name) setSearchMessage('No search result');
          else {
            setTotalTasks(data.totalItems);
            setSearchMessage('');
          }
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doCreateTask = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await createTask(payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doGetTask = async (taskId, callback) => {
    if (taskId) {
      try {
        setLoading(true);

        const response = await getTask(taskId, loggedInUser);
        const {data, status} = response;

        if (status === 200) {
          setTask(data);

          if (callback) callback();
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doUpdateTask = async (taskId, payload, callback) => {
    try {
      setLoading(true);

      const response = await updateTask(taskId, payload, loggedInUser);
      const {data, status} = response;

      if (status === 200) {
        setTask(task => {
          return {
            ...task,
            ...data
          }
        });
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doDeleteTask = async (taskId, callback) => {
    if (taskId) {
      try {
        setLoading(true);

        const response = await deleteTask(taskId, loggedInUser);
        const {status} = response;

        if (status === 200) {
          const params = {
            page: currentPage,
            limit: TEAM_PAGE_SIZE,
            isSearching: true
          };
          await doGetTeamTasks(params);
          if (callback) callback();
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  return (
    <TaskContext.Provider
      value={{
        currentPage,
        totalPages,
        setCurrentPage,
        doGetTeamTasks,
        doCreateTask,
        doDeleteTask,
        doGetMyTasks,
        doUpdateTask,
        doGetTask,
        setIsDone,
        tasks,
        setTask,
        task,
        totalTasks,
        isDone
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
