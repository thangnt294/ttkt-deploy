import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  getTeams,
  getTeam,
  getOrgTeams,
  createTeam,
  updateTeam,
  removeTeam,
  OPERATION_FAILED_MESSAGE,
  TEAM_PAGE_SIZE, updateMember, TEAM, updateMemberRole, removeMemberFromTeam,
  // getUploadedSignedFileUrl
} from 'actions';
import { GET_FILE } from 'actions/constants';
import { HomeContext, AuthContext } from 'contexts';

export const TeamContext = createContext();

export const TeamContextProvider = ({ children }) => {
    const { setLoading, setNotificationMessage, setSearchMessage, setNotificationType } = useContext(HomeContext);
    const { loggedInUser, userInfo, doGetUserInfo } = useContext(AuthContext);
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTeams, setTotalTeams] = useState(0);
    const [userTeamRole] = useState('');

    /*eslint-disable */

    // Clear all state after logout
    // useEffect(() => {
    //     if (!loggedInUser) {
    //         setTeams([]);
    //         setCurrentPage(0);
    //         setTotalPages(1);
    //         setTotalTeams(0);
    //         setTeam(null);
    //     }
    // }, [loggedInUser])
    /*eslint-enable */

    const handleException = error => {
        const { data } = (error.response || {});
        setLoading(false);
        setNotificationType('error');
        setNotificationMessage((data && (data.message || data.error)) || OPERATION_FAILED_MESSAGE);
    }

    const doGetTeams = async (params, callback, errorCallBack, hasLoading = true) => {
        setTeam(null);
            try {
                if (hasLoading) setLoading(true);
                delete params.isSearching;

                const response = await getTeams(params, loggedInUser);
                const { data, status } = response;

                if (status === 200) {
                    setTeams(data.items || []);
                    setTotalPages(data.totalPage);
                    setCurrentPage(data.currentPage);
                    if (callback) callback();
                    if (!data.items.length) {
                        if (errorCallBack) errorCallBack();
                    }
                    if (params.name) setSearchMessage('No search result');
                    else {
                        setTotalTeams(data.totalItems);
                        setSearchMessage('');
                    }
                }

                if (hasLoading) setLoading(false);
            } catch (error) {
                handleException(error);
            }
    }

    const doCreateTeam = async (payload, callback) => {
        try {
            setLoading(true);
            delete payload.isOrgTeam;

            const response = await createTeam(payload, loggedInUser);
            const { status } = response;

            if (status === 200) {
                const params = {
                    page: currentPage,
                    limit: TEAM_PAGE_SIZE,
                    isSearching: true
                };

                await doGetTeams(params);
                doGetUserInfo();

                if (callback) callback();
            }

            setLoading(false);
        } catch (error) {
            handleException(error);
        }
    }

    const doGetTeam = async (teamId, callback, isSearching = false) => {
        if (teamId) {
            // if (teams && teams.length > 0 && !isSearching) {
            //     setTeam(teams.find(o => o._id === teamId));
            // } else {
                try {
                    setLoading(true);

                    const response = await getTeam(teamId, loggedInUser);
                    const { data, status } = response;

                    if (status === 200) {
                        setTeam(data);

                        if (callback) callback();
                    }

                    setLoading(false);
                } catch (error) {
                    handleException(error);
                }
            // }
        }
    }

    const doUpdateTeam = async (teamId, payload, callback) => {
        try {
            setLoading(true);

            const response = await updateTeam(teamId, payload, loggedInUser);
            const { data, status } = response;

            if (status === 200) {
                setTeam(oldTeam => {
                    return {
                        ...oldTeam,
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

    const doDeleteTeam = async (teamId, callback) => {
        if (teamId) {
            try {
                setLoading(true);

                const response = await removeTeam(teamId, loggedInUser);
                const { status } = response;

                if (status === 200) {
                    const params = {
                        page: currentPage,
                        limit: TEAM_PAGE_SIZE,
                        isSearching: true
                    };
                    await doGetTeams(params);
                if (callback) callback();
            }

                setLoading(false);
            } catch (error) {
                handleException(error);
            }
        }
    }

  const doUpdateMemberRole = async (teamId, payload, callback) => {
    try {
      setLoading(true);

      const response = await updateMemberRole(teamId, payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        setLoading(false);
        if (callback) callback();
      }
    } catch (error) {
      handleException(error);
    }
  }

  const doRemoveMemberFromTeam = async (teamId, payload, callback) => {
    try {
      setLoading(true);

      const response = await removeMemberFromTeam(teamId, payload, loggedInUser);
      const {status} = response;

      if (status === 200) {
        setLoading(false);
        if (callback) callback();
      }
    } catch (error) {
      handleException(error);
    }
  }

    return(
        <TeamContext.Provider
            value={{
                currentPage,
                teams,
                team,
                totalPages,
                totalTeams,
                userTeamRole,
                setCurrentPage,
                setTeam,
                setTeams,
                doGetTeams,
                doCreateTeam,
                doGetTeam,
                doUpdateTeam,
                doDeleteTeam,
                doUpdateMemberRole,
                doRemoveMemberFromTeam
            }}
        >
            { children }
        </TeamContext.Provider>
    );
};
