import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';

import './index.scss';
import {InviteMembers, Modal, TeamDetails} from 'components';
import {HomeContext, MemberContext, ModalContext, TeamContext} from 'contexts';
import {MEMBER_PAGE_SIZE, ORGANIZATIONS_LIST_URL} from 'actions';
import {useLocation} from 'react-router-dom';

export const AddTeam = ({open = false, onCancel}) => {
  const location = useLocation();
  const {setNotificationMessage} = useContext(HomeContext);
  const {setAddTeam} = useContext(ModalContext);
  const {doCreateTeam} = useContext(TeamContext);
  const {allMembers, doGetMembers, setAllMembers} = useContext(MemberContext);

  const {handleSubmit, register, errors, trigger, formState, reset} = useForm();
  const [members, setMembers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [tempAllMembers, setTempAllMembers] = useState([]);

  /*eslint-disable */
  useEffect(() => {
    if (open) doGetMembers({
      // page: 0,
      // limit: MEMBER_PAGE_SIZE,
      isSearching: true,
      sort: 'name_asc',
      listing: true
    });
  }, [open])

  useEffect(() => {
    if (!tempAllMembers.length) {
      setTempAllMembers(allMembers);
    }
  }, [allMembers])

  useEffect(() => {
    if (tempAllMembers.length > 0) setAllMembers(tempAllMembers);
  }, [members])
  /*eslint-enable */

  const doAddTeam = data => {
    const {
      teamName,
      teamDescription
    } = data;

    const payload = {
      name: teamName,
      description: teamDescription,
      members: members.map(member => ({
          memberId: member.id,
          role: member.role
      }))
    };

    doCreateTeam(payload, () => {
      reset();
      setMembers([]);
      setAddTeam(false);
      setNotificationMessage(`
                <p><strong>${payload.name}</strong> team has been added successfully!</p>
            `);
    });
  }

  const onHideAddTeamModal = () => {
    reset();
    onCancel();
    setMembers([]);
  }

  const getMembers = value => {
    setMemberLoading(true);

    doGetMembers({
      term: value,
      page: 0,
      limit: MEMBER_PAGE_SIZE,
      isSearching: true,
      sort: 'name_asc',
      listing: true
    }, () => {
      setMemberLoading(false);
    }, false);
  };

  const handleAddItem = () => {
    if (tempAllMembers.length > 0) setAllMembers(tempAllMembers);
  }

  return (
    <Modal
      open={open}
      className="tr__add-team"
      onCancel={onHideAddTeamModal}
      title="Add New Team"
      submitButton
      submitButtonLabel="Add"
      footerLabel="We will invite all new members on behalf of you"
      isBackDropClickable={false}
      renderForm={children => (
        <form onSubmit={handleSubmit(doAddTeam)}>
          {children}
        </form>
      )}
    >
      <TeamDetails
        title="Team Details"
        isEditable={true}
        register={register}
        errors={errors}
        searchLoading={searchLoading}
        formState={formState}
      />
      <InviteMembers
        title="Invite Members"
        isMember={false}
        register={register}
        members={allMembers}
        errors={errors}
        selectedMembers={members}
        onAddItem={handleAddItem}
        setSelectedMembers={setMembers}
        onInputChange={getMembers}
        searchLoading={memberLoading}
        isNew={true}
        formState={formState}
      />
    </Modal>
  )
};

AddTeam.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func
};
