import axios from 'axios';
import {authHeaders, TASK_MINE} from 'actions';
import {
  TASK_TEAM,
  TASK,
  TASK_DETAILS
} from './constants';

export const getTeamTasks = (params, token) => {
  return axios.get(TASK_TEAM, params ? {
    params,
    ...authHeaders(token)
  } : authHeaders(token));
};

export const getMyTasks = (params, token) => {
  return axios.get(TASK_MINE, params ? {
    params,
    ...authHeaders(token)
  } : authHeaders(token));
};

export const getTask = (taskId, token) => {
  if (!taskId) return;
  return axios.get(TASK_DETAILS.replace(':taskId', taskId), authHeaders(token));
};

export const createTask = (payload, token) => {
  if (!payload) return;
  return axios.post(TASK, payload, authHeaders(token));
};

export const updateTask = (taskId, payload, token) => {
  if (!payload) return;
  return axios.put(TASK_DETAILS.replace(':taskId', taskId), payload, authHeaders(token));
};

export const deleteTask = (taskId, token) => {
  if (!taskId) return;
  return axios.delete(TASK_DETAILS.replace(':taskId', taskId), authHeaders(token));
};
