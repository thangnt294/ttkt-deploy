import React, { createContext, useContext, useEffect, useState } from 'react';
import { scrollToElement } from 'utils';
import { HomeContext } from './HomeContext';

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
    const { notificationMessage } = useContext(HomeContext);
    const [addShipmentDetails, setAddShipmentDetails] = useState(false);
    const [addOrganization, setAddOrganization] = useState(false);
    const [addTeam, setAddTeam] = useState(false);
    const [addMember, setAddMember] = useState(false);
    const [memberSettings, setMemberSettings] = useState(false);
    const [editSection, setEditSection] = useState(false);
    const [addSection, setAddSection] = useState(false);
    const [noResultSearch, setNoResultSearch] = useState(false);
    const [deleteTemplate, setDeleteTemplate] = useState(false);
    const [deleteTask, setDeleteTask] = useState(false);
    const [cloneTemplate, setCloneTemplate] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [editTask, setEditTask] = useState(false);
    const [assignMembers, setAssignMembers] = useState(false);
    const [allCollaborators, setAllCollaborators] = useState(false);
    const [addIssue, setAddIssue] = useState(false);
    const [assignCollaborators, setAssignCollaborators] = useState(false);
    const [activeShipmentFilter, setActiveShipmentFilter] = useState(false);
    const [requestFilter, setRequestFilter] = useState(false);
    const [viewDocuments, setViewDocuments] = useState(false);
    const [editExtractedInfo, setEditExtractedInfo] = useState(false);
    const [document, setDocument] = useState(false);
    const [reuploadDoc, setReuploadDoc] = useState(false);
    const [cancelTrackShipment, setCancelTrackShipment] = useState(false);
    const [addLink, setAddLink] = useState(false);
    const [confirmCancelModal, setConfirmCancelModal] = useState(false);
    const [confirmRejectModal, setConfirmRejectModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [notification, setNotification] = useState(false);
    const [deleteOrganization, setDeleteOrganization] = useState(false);
    const [deleteTeam, setDeleteTeam] = useState(false);
    const [editIssue, setEditIssue] = useState(false);
    const [isEditSection, setIsEditSection] = useState(false);
    const [removeMembers, setRemoveMembers] = useState(false);
    const [deleteMe, setDeleteMe] = useState(false);
    const [deleteMeOwner, setDeleteMeOwner] = useState(false);
    const [changeOwner, setChangeOwner] = useState(false);
    const [leaveOwnerOrg, setLeaveOwnerOrg] = useState(false);
    const [leaveOrg, setLeaveOrg] = useState(false);
    const [leaveTeam, setLeaveTeam] = useState(false);
    const [signOut, setSignOut] = useState(false);
    const [confirmStatusIssue, setConfirmStatusIssue] = useState(false);
    const [confirmStatusShipment, setConfirmStatusShipment] = useState(false);
    const [viewExtractedInfo, setViewExtractedInfo] = useState(false);
    const [previewTempalates, setPreviewTempalates] = useState(false);
    const [removeCollaborator, setRemoveCollaborator] = useState(false);
    const [addBRCollaborators, setAddBRCollaborators] = useState(false);
    const [confirmSaveTemplate, setConfirmSaveTemplate] = useState(false);
    const [editTemplate, setEditTemplate] = useState(false);
    const [joinOrg, setJoinOrg] = useState(false);
    const [confirmCancelRequest, setConfirmCancelRequest] = useState(false);
    const [viewRequestSetting, setViewRequestSetting] = useState(false);
    const [confirmApprove, setConfirmApprove] = useState(false);
    const [linkIssueList, setLinkIssueList] = useState(false);

    /*eslint-disable */
    useEffect(() => {
        if (notificationMessage) {
            setNotification(true);
            scrollToElement();
        }
    }, [notificationMessage])
    /*eslint-enable */
    return(
        <ModalContext.Provider
            value={{
                addShipmentDetails,
                addOrganization,
                addTeam,
                addMember,
                memberSettings,
                editSection,
                addSection,
                deleteTemplate,
                deleteTask,
                cloneTemplate,
                addTask,
                editTask,
                noResultSearch,
                assignMembers,
                assignCollaborators,
                allCollaborators,
                addIssue,
                editIssue,
                isEditSection,
                activeShipmentFilter,
                requestFilter,
                viewDocuments,
                editExtractedInfo,
                document,
                reuploadDoc,
                cancelTrackShipment,
                addLink,
                confirmCancelModal,
                confirmRejectModal,
                confirmModal,
                notification,
                deleteOrganization,
                deleteTeam,
                removeMembers,
                deleteMe,
                deleteMeOwner,
                changeOwner,
                leaveOwnerOrg,
                leaveOrg,
                leaveTeam,
                signOut,
                confirmStatusIssue,
                confirmStatusShipment,
                viewExtractedInfo,
                previewTempalates,
                removeCollaborator,
                addBRCollaborators,
                confirmSaveTemplate,
                editTemplate,
                joinOrg,
                confirmCancelRequest,
                viewRequestSetting,
                confirmApprove,
                linkIssueList,
                setLinkIssueList,
                setConfirmApprove,
                setViewRequestSetting,
                setConfirmCancelRequest,
                setConfirmStatusShipment,
                setConfirmStatusIssue,
                setAddShipmentDetails,
                setAddOrganization,
                setAddTeam,
                setAddMember,
                setMemberSettings,
                setEditSection,
                setAddSection,
                setDeleteTemplate,
                setDeleteTask,
                setCloneTemplate,
                setAddTask,
                setEditTask,
                setNoResultSearch,
                setAssignMembers,
                setAssignCollaborators,
                setAllCollaborators,
                setAddIssue,
                setEditIssue,
                setIsEditSection,
                setActiveShipmentFilter,
                setRequestFilter,
                setViewDocuments,
                setEditExtractedInfo,
                setDocument,
                setReuploadDoc,
                setCancelTrackShipment,
                setAddLink,
                setConfirmCancelModal,
                setNotification,
                setDeleteOrganization,
                setDeleteTeam,
                setRemoveMembers,
                setDeleteMe,
                setDeleteMeOwner,
                setChangeOwner,
                setLeaveOwnerOrg,
                setLeaveOrg,
                setLeaveTeam,
                setSignOut,
                setConfirmRejectModal,
                setConfirmModal,
                setViewExtractedInfo,
                setPreviewTempalates,
                setRemoveCollaborator,
                setAddBRCollaborators,
                setConfirmSaveTemplate,
                setEditTemplate,
                setJoinOrg
            }}
        >
            { children }
        </ModalContext.Provider>
    );
};