import axios from 'axios';
import { authHeaders } from 'actions';
import {
    TEAMS,
    GET_ORG_TEAMS,
    GET_TEAM
} from './constants';

export const getTeams = (params, token) => {
    return axios.get(TEAMS, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

export const getTeam = (teamId, token) => {
    if (!teamId) return;
    return axios.get(GET_TEAM.replace(':teamId', teamId), authHeaders(token));
};

export const getOrgTeams = (params, token) => {
    const { orgId } = params;
    if (!orgId) return;
    delete params.orgId;
    return axios.get(GET_ORG_TEAMS.replace(':orgId', orgId), params ? {
        params,
        ...authHeaders(token)
    }: authHeaders(token));
};

export const createTeam = (payload, token) => {
    if (!payload) return;
    return axios.post(TEAMS, payload, authHeaders(token));
};

export const updateTeam = (teamId, payload, token) => {
    if (!payload) return;
    return axios.put(GET_TEAM.replace(':teamId', teamId), payload, authHeaders(token));
};

export const removeTeam = (teamId, token) => {
    if (!teamId) return;
    return axios.delete(GET_TEAM.replace(':teamId', teamId), authHeaders(token));
};
