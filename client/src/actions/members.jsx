import axios from 'axios';
import {authHeaders, REMOVE_MEMBERS, UPDATE_MEMBERS} from 'actions';
import {
    GET_TEAM_MEMBERS,
    GET_ORG_MEMBERS,
    GET_MEMBER,
    MEMBERS,
    PERSONAL_UPDATE,
    PERSONAL_LEAVE,
    DELETE_ME
} from './constants';

export const getMembers = (params, token) => {
    return axios.get(MEMBERS, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}

export const getTeamMembers = (params, token) => {
    const { teamId } = params;
    if (!teamId) return;
    delete params.teamId;
    return axios.get(GET_TEAM_MEMBERS.replace(':teamId', teamId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

export const getOrgMembers = (params, token) => {
    const { orgId } = params;
    if (!orgId) return;
    delete params.orgId;
    return axios.get(GET_ORG_MEMBERS.replace(':orgId', orgId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

export const getMember = (memberId, token) => {
    if (!memberId) return;
    return axios.get(GET_MEMBER.replace(':memberId', memberId), authHeaders(token));
};

export const addMember = (payload, token) => {
    if (!payload) return;
    return axios.post(MEMBERS, payload, authHeaders(token));
};

export const updateMember = (payload, token) => {
    if (!payload) return;
    return axios.put(MEMBERS, payload, authHeaders(token));
};

export const removeMember = (payload, token) => {
    if (!payload) return;
    return axios.delete(MEMBERS, {
        data: payload,
        ...authHeaders(token)
    });
};

export const deleteMe = token => {
    return axios.delete(DELETE_ME, authHeaders(token));
};

export const updatePersonalSettings = (payload, token) => {
    if (!payload) return;
    return axios.put(PERSONAL_UPDATE, payload, authHeaders(token));
};

export const leaveTeams = (payload, token) => {
    if (!payload) return;
    return axios.put(PERSONAL_LEAVE, payload, authHeaders(token));
};

export const updateMemberRole = (teamId, payload, token) => {
  if (!payload || !teamId) return;
  return axios.put(UPDATE_MEMBERS.replace(':teamId', teamId), payload, authHeaders(token));
}
export const removeMemberFromTeam = (teamId, memberIds, token) => {
  if (!memberIds || !teamId) return;
  return axios.put(REMOVE_MEMBERS.replace(':teamId', teamId), memberIds, authHeaders(token));
}

