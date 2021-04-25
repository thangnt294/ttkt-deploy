import React, {createContext, useContext, useState} from 'react';

import {
  addMember,
  deleteMe,
  getMember,
  getMembers,
  getOrgMembers,
  getTeamMembers,
  leaveOrgsTeams,
  OPERATION_FAILED_MESSAGE,
  removeMember,
  TEAM,
  updateMember,
  updatePersonalSettings,
} from 'actions';
import {AuthContext, HomeContext} from 'contexts';
import {GET_FILE} from 'actions/constants';
import {TeamContext} from './TeamContext';
import {isEmail} from 'utils';

export const MemberContext = createContext();

export const MemberContextProvider = ({children}) => {
  const {setLoading, setNotificationMessage, setSearchMessage, setNotificationType} = useContext(HomeContext);
  const {team, doGetTeam} = useContext(TeamContext);
  const {loggedInUser, doGetUserInfo, setUserInfo} = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [member, setMember] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [orgRole, setOrgRole] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [totalMembers, setTotalMembers] = useState(0);

  const handleException = error => {
    console.log(error);
    const {data} = error.response;
    setLoading(false);
    setNotificationType('error');
    setNotificationMessage((data && (data.message || data.error)) || OPERATION_FAILED_MESSAGE);
  }

  const doGetMembers = async (params, callback, errorCallBack, hasLoading = true) => {
    if (params && params.isSearching) {
      if (params.listing) {
        setAllMembers([]);
      } else {
        if (hasLoading) setMembers([]);
        setTotalPages(1);
        setCurrentPage(0);
      }
    }
    if (members.length === 0 || currentPage !== params.page || params.isSearching) {
      try {
        const newParams = {...params};
        if (hasLoading) setLoading(true);
        delete newParams.isSearching;
        delete newParams.listing;

        const response = await getMembers(newParams, loggedInUser);
        const {data, status} = response;
        if (status === 200) {
          if (!params.disableInviteMember && params.term && isEmail(params.term) && [...data.items].findIndex(e => e.email === params.term) < 0) {
            // for inviting new member
            data.items = [...[{
              email: params.term
            }],
              ...data.items];
          }
          if (params && params.listing) {
            setAllMembers(data.items || []);
          } else {
            setMembers(data.items || []);
            setTotalPages(data.totalPage);
            setCurrentPage(data.currentPage);
          }
          if (callback) callback();
          if (!data.items.length) {
            if (errorCallBack) errorCallBack();
          }
          if (params.name) setSearchMessage('No search result');
          else {
            if (params && !params.listing) setTotalMembers(data.totalItems);
            setSearchMessage('');
          }
        }

        if (hasLoading) setLoading(false);
      } catch (error) {
        handleException(error);
        setSearchMessage('No search result')
      }
    }
  }

  const doGetOrgMembers = async (params, callback, hasLoading = true) => {
    if (params && params.isSearching) {
      setTotalPages(1);
      setCurrentPage(0);

      if (hasLoading) setMembers([])
    }
    if (members.length === 0 || currentPage !== params.page || params.isSearching) {
      setMember([]);
      try {
        if (hasLoading) setLoading(true);
        delete params.isSearching;

        const response = await getOrgMembers(params, loggedInUser);
        const {data, status} = response;

        if (status === 200) {
          for (let member of data.items) {
            if (member.avatar) {
              // let signedLogo = await getUploadedSignedFileUrl(member.avatar, loggedInUser);
              // member.avatar = signedLogo.data.ret.downloadSignedURI.itemURI;

              member.avatar = GET_FILE + member.avatar;
            }
          }

          setMembers(data.items || []);
          setTotalPages(data.totalPage);
          setCurrentPage(data.currentPage);
          if (callback) callback();
          if (params.name) setSearchMessage('No search result');
          else {
            setTotalMembers(data.totalItems);
            setSearchMessage('');
          }
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doGetTeamMembers = async (params, callback, hasLoading = true) => {
    if (params && params.isSearching) {
      setTotalPages(1);
      setCurrentPage(0);

      if (hasLoading) setMembers([])
    }
    if (members.length === 0 || currentPage !== params.page || params.isSearching) {
      setMember([]);
      try {
        if (hasLoading) setLoading(true);
        delete params.isSearching;

        const response = await getTeamMembers(params, loggedInUser);
        const {data, status} = response;

        if (status === 200) {
          for (let member of data.items) {
            if (member.avatar) {
              // let signedLogo = await getUploadedSignedFileUrl(member.avatar, loggedInUser);
              // member.avatar = signedLogo.data.ret.downloadSignedURI.itemURI;

              member.avatar = GET_FILE + member.avatar;
            }
          }
          setMembers(data.items || []);
          setTotalPages(data.totalPage);
          setCurrentPage(data.currentPage);
          if (callback) callback();
          if (params.name) setSearchMessage('No search result');
          else {
            setTotalMembers(data.totalItems);
            setSearchMessage('');
          }
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doGetMember = async (memId, callback) => {
    if (memId) {
      try {
        setLoading(true);

        const response = await getMember(memId, loggedInUser);
        const {data, status} = response;

        if (status === 200) {
          /**
           * TODO:
           * Use Promise at here, because currently data be wrong in db,
           *  should revert to previous version of this code block after BE migrating data to exact.
           */
          // getUploadedSignedFileUrl(data.avatar, loggedInUser)
          //     .then(avatar => data.avatar = avatar.data.ret.downloadSignedURI.itemURI)
          //     .catch(() => { /* Do nothing... */
          //     })
          //     .finally(() => {
          //         setMember(data);

          //         if (callback) callback();
          //     });
          if (data.avatar)
            data.avatar = GET_FILE + data.avatar;
          else
            delete data.avatar;
          setMember(data);
          if (callback) callback();
        }

        setLoading(false);
      } catch (error) {
        handleException(error);
      }
    }
  }

  const doAddMember = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await addMember(payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        doGetTeam(payload.members[0].teamRoles[0].teamId, () => {
          if (callback) callback();
        }, true);
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doUpdateMember = async (payload, callback) => {
    const newPayload = {...payload};
    delete newPayload.type;

    try {
      setLoading(true);

      const response = await updateMember(newPayload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        doGetUserInfo(() => {
          if (payload.type === TEAM) {
            doGetTeam(payload.teamRoles[0].teamId, () => {
              if (callback) callback();

              setLoading(false);
            }, true);
          }
        });
      }
    } catch (error) {
      handleException(error);
    }
  }

  const doRemoveMembers = async (payload, callback, errorCallback) => {
    try {
      setLoading(true);

      const response = await removeMember(payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        setMembers(oldMembers => [...oldMembers.filter(mem => !payload.memberIds.some(memId => memId === mem._id))])
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      if (errorCallback) errorCallback();
      handleException(error);
    }
  }

  const doDeleteMe = async (callback, errorCallback) => {
    try {
      setLoading(true);

      const response = await deleteMe(loggedInUser);
      const {data} = response;

      setNotificationMessage(data && (data.message));
      setLoading(false);
      if (callback) callback();

    } catch (error) {
      if (errorCallback) errorCallback();
      handleException(error);
    }
  }

  const doUpdatePersonalSettings = async (payload, callback) => {
    try {
      setLoading(true);

      const avatarUrl = payload.avatarUrl;
      delete payload.avatarUrl;
      payload.name = payload.name.trim();

      const response = await updatePersonalSettings(payload, loggedInUser);
      const {status} = response;

      if (avatarUrl) payload.avatar = avatarUrl;

      if (status === 200) {
        setMember(oldMember => {
          return {
            ...oldMember,
            ...payload
          }
        });
        setUserInfo(oldInfo => {
          return {
            ...oldInfo,
            ...payload
          }
        })
        if (callback) callback();
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  const doLeaveOrgsTeams = async (payload, callback) => {
    try {
      setLoading(true);

      const response = await leaveOrgsTeams(payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        setMember(oldMember => {
          return {
            ...oldMember,
            orgTeams: payload.orgIds ? oldMember.orgTeams.filter(org => !payload.orgIds.some(id => id === org.orgId)) : oldMember.orgTeams.map(org => {
              return {
                ...org,
                teams: org.teams.filter(team => !payload.teamIds.some(t => t === team.teamId))
              }
            })
          }
        });
        doGetUserInfo(() => {
          if (callback) callback();
        });
      }

      setLoading(false);
    } catch (error) {
      handleException(error);
    }
  }

  return (
    <MemberContext.Provider
      value={{
        currentPage,
        members,
        allMembers,
        member,
        totalPages,
        totalMembers,
        orgRole,
        teamRole,
        setMembers,
        setCurrentPage,
        doGetMembers,
        doGetOrgMembers,
        doAddMember,
        doUpdateMember,
        doRemoveMembers,
        doGetTeamMembers,
        doGetMember,
        doDeleteMe,
        doUpdatePersonalSettings,
        doLeaveOrgsTeams,
        setAllMembers
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};
