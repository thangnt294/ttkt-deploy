import React, {createContext, useContext, useEffect, useState} from 'react';
import {AuthContext, AuthContextProvider} from './AuthContext';
import {
  ALL, ALL_TEAMS_URL,
  CREATED,
  CREATOR,
  ERROR, getTeam,
  MARK_NEW,
  ORGANIZATIONS_DETAILS_URL,
  SUCCESS,
  TEAMS_URL
} from 'actions';
import {getTeamTasks} from "../actions/tasks";
import {TaskContextProvider} from "./TaskContext";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isArchive, setIsArchive] = useState(false);
    const [isTemplate, setIsTemplate] = useState(false);
    const [teamMember, setTeamMember] = useState(false);
    const [isEditTask, setIsEditTask] = useState(false);
    const [breadcrums, setBreadcrums] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationDuration, setNotificationDuration] = useState(3000);
    const [notificationType, setNotificationType] = useState(SUCCESS);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isOrgTeamDetails, setIsOrgTeamDetails] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
    const [authErrorActive, setAuthErrorActive] = useState(false);
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    const [authErrorType, setAuthErrorType] = useState(ERROR);
    const [bookingRequestTab, setBookingRequestTab] = useState(CREATED);
    const [brType, setBrType] = useState(CREATOR);
    const [markAsShipmentType, setMarkAsShipmentType] = useState(MARK_NEW);
    const [markAsShipmentTemplate, setMarkAsShipmentTemplate] = useState();
    const [trackerTemplate, setTrackerTemplate] = useState();
    const [sectionId, setSectionId] = useState();
    const [sectionName, setSectionName] = useState();
    const [sectionOrder, setSectionOrder] = useState();
    const [taskId, setTaskId] = useState('');
    const [eventTask, setEventTask] = useState();
    const [documentTask, setDocumentTask] = useState();
    const [selectTask, setSelectTask] = useState();
    const [taskName, setTaskName] = useState();
    const [taskRoles, setTaskRoles] = useState([]);
    const [collaboratorId, setCollaboratorId] = useState('');
    const [fileId, setFileId] = useState('');
    const [shipment, setShipment] = useState();
    const [idTemplate, setIdTemplate] = useState('');
    const [seachParamActive, setSeachParamActive] = useState("");
    const [searchTerm, setSearchTerm] = useState();
    const [isSearchingShipment, setIsSearchingShipment ] = useState(true);
    const [currentTabManagement, setCurrentTabManagement] = useState(ALL);
    const [isAddTaskFta, setIsAddTaskFta] = useState(false);
    const [isExtractedFta, setIsExtractedFta] = useState(false);
    const [payloadConfirm, setPayloadConfirm] = useState();

    let extraTimeout = 1000;
    let timeout = null;
    let notificationTimeout = null;

    /*eslint-disable */
    useEffect(() => {
        setAuthErrorActive(!!authErrorMessage);
    }, [authErrorMessage])

    useEffect(() => {
        if (authErrorActive && !timeout) {
            timeout = setTimeout(() => {
                setAuthErrorActive(false);
                setTimeout(() => {
                    setAuthErrorMessage('');
                    setAuthErrorType(ERROR);
                }, extraTimeout);
            }, notificationDuration);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        }
    }, [authErrorActive])

    useEffect(() => {
        if (notificationType === ERROR && !notificationTimeout) {
            notificationTimeout = setTimeout(() => {
                setNotificationType(SUCCESS);
            }, notificationDuration + extraTimeout)
        }

        return () => {
            if (notificationTimeout) clearTimeout(notificationTimeout);
        }
    }, [notificationType])

    const backToTeamListUrl = (history) => {
      history.push(ALL_TEAMS_URL);
    }

    return(
        <HomeContext.Provider
            value={{
                loading,
                isTemplate,
                teamMember,
                isEditTask,
                isArchive,
                breadcrums,
                bookingRequestTab,
                notificationMessage,
                notificationDuration,
                notificationType,
                isOrgTeamDetails,
                confirmMessage,
                isOwner,
                authErrorActive,
                authErrorMessage,
                authErrorType,
                brType,
                searchMessage,
                searchTerm, 
                isSearchingShipment,
                seachParamActive,
                markAsShipmentType,
                markAsShipmentTemplate,
                trackerTemplate,
                sectionId,
                sectionName,
                documentTask,
                eventTask,
                selectTask,
                taskName,
                taskRoles,
                shipment,
                idTemplate,
                taskId,
                collaboratorId,
                fileId,
                currentTabManagement,
                sectionOrder,
                isAddTaskFta,
                isExtractedFta,
                payloadConfirm,
                setPayloadConfirm,
                setIsExtractedFta,
                setIsAddTaskFta,
                setSectionOrder,
                setShipment,
                setIdTemplate,
                setTaskRoles,
                setTaskName,
                setEventTask,
                setSectionName,
                setSectionId,
                setDocumentTask,
                setSelectTask,
                setLoading,
                setIsTemplate,
                setTeamMember,
                setIsEditTask,
                setIsArchive,
                setBreadcrums,
                setNotificationMessage,
                setNotificationDuration,
                setNotificationType,
                setIsOrgTeamDetails,
                backToTeamListUrl,
                setConfirmMessage,
                setIsOwner,
                setSearchMessage,
                setSearchTerm,
                setSeachParamActive,
                setIsSearchingShipment,
                setAuthErrorActive,
                setAuthErrorMessage,
                setAuthErrorType,
                setBookingRequestTab,
                setBrType,
                setMarkAsShipmentType,
                setMarkAsShipmentTemplate,
                setTrackerTemplate,
                setTaskId,
                setCollaboratorId,
                setFileId,
                setCurrentTabManagement
            }}
        >
            <AuthContextProvider>
              <TaskContextProvider>
                            {children}
              </TaskContextProvider>
            </AuthContextProvider>
        </HomeContext.Provider>
    );
};
