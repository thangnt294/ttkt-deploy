import axios from 'axios';
import { authHeaders } from 'actions';
import {
    GET_TEAM_MEMBERS,
    GET_ORG_MEMBERS,
    GET_MEMBER,
    MEMBERS,
    PERSONAL_UPDATE,
    PERSONAL_LEAVE,
    DELETE_ME
} from './constants';

/** Get members
* @param {
*      page: string
*      limit: string
*      sort: name_asc | name_desc | ...
* } params 
*/
export const getMembers = (params, token) => {
    return axios.get(MEMBERS, params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
}

/** Get members of a team
* @param {
*      teamId: string
*      page: string
*      limit: string
*      sort: name_asc | name_desc | ...
* } params 
*/
export const getTeamMembers = (params, token) => {
    const { teamId } = params;
    if (!teamId) return;
    delete params.teamId;
    return axios.get(GET_TEAM_MEMBERS.replace(':teamId', teamId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get members of a organizations
* @param {
*      orgId: string
*      page: int
*      limit: int
*      sort: name_asc | name_desc | ...
* } params 
*/
export const getOrgMembers = (params, token) => {
    const { orgId } = params;
    if (!orgId) return;
    delete params.orgId;
    return axios.get(GET_ORG_MEMBERS.replace(':orgId', orgId), params ? {
        params,
        ...authHeaders(token)
    } : authHeaders(token));
};

/** Get member
* @param {
*      memId: string
* } params 
*/
export const getMember = (memId, token) => {
    if (!memId) return;
    return axios.get(GET_MEMBER.replace(':memId', memId), authHeaders(token));
};

/** Add member to organization and team
* @param {
*      orgId: string
*      members: [
*            {
*               memberId: string,
*               email: string,
*               orgRole: string
*               teamRoles: [
*                   teamId: string,
*                   roleName: string
*               ]
*            }
*      ]
* } payload 
*/
export const addMember = (payload, token) => {
    if (!payload) return;
    return axios.post(MEMBERS, payload, authHeaders(token));
};

/** Update member settings
* @param {
*      memId: string
*      orgId: string
*      teamRoles: [
*          teamId: string,
*          roleName: string
*      ]
* } payload 
*/
export const updateMember = (payload, token) => {
    if (!payload) return;
    return axios.put(MEMBERS, payload, authHeaders(token));
};

/** Remove member from teams or organizations
* @param {
*      memberIds: [string]
*      orgIds: [string]
*      teamIds: [string]
* } payload 
*/
export const removeMember = (payload, token) => {
    if (!payload) return;
    return axios.delete(MEMBERS, {
        data: payload,
        ...authHeaders(token)
    });
};

/** Remove member from teams or organizations
*/
export const deleteMe = token => {
    return axios.delete(DELETE_ME, authHeaders(token));
};

/** Update personal settings
* @param {
*      name: string
*      email: string
*      primaryContactNumber: string,
*      contactNumber: [string]
*      avatar: string
* } payload 
*/
export const updatePersonalSettings = (payload, token) => {
    if (!payload) return;
    return axios.put(PERSONAL_UPDATE, payload, authHeaders(token));
};

/** Personal settings - Leave orgs or teams
* @param {
*      teamIds: [string]
*      orgIds: [string]
* } payload 
*/
export const leaveOrgsTeams = (payload, token) => {
    if (!payload) return;
    return axios.put(PERSONAL_LEAVE, payload, authHeaders(token));
};