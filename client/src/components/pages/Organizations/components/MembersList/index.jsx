import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import './index.scss';
import defaultAvatar from 'assets/images/avatar.png';
import { DetailsTableHeader, Table, TableFooter } from 'components';
import { HomeContext, MemberContext, ModalContext, TeamContext } from 'contexts';
import { MEMBER, MEMBER_PAGE_SIZE } from 'actions';
import { getRole } from 'utils';
import { Brand } from '../../../../../pages/Teams/Brand';

export const MembersList = ({
  of,
  backUrl = () => {
  },
  onAddNewClick,
  selectedMembers = [],
  setSelectedMembers = () => {
  }
}) => {
  const {
    teamId
  } = useParams();
  const { searchMessage } = useContext(HomeContext);
  const {
    setMemberSettings,
    setRemoveMembers
  } = useContext(ModalContext);
  const {
    currentPage,
    totalPages,
    doGetOrgMembers,
    doGetTeamMembers,
    doGetMember,
    members,
    totalMembers
  } = useContext(MemberContext);
  const {
    team,
    userTeamRole
  } = useContext(TeamContext);

  const [searchValue, setSearchValue] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const columns = [
    {
      dataIndex: '_id,name,avatar',
      render: (_id, name, avatar) => <Brand
        brand={{
          _id,
          logo: avatar ? avatar : defaultAvatar,
          name: name
        }}
        isSelectable={true}
        disabled={!hasPermission(_id) || isMember()}
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
    },
    {
      dataIndex: 'email',
      render: email => <h6 className='h6' title={email}>{email}</h6>
    },
    {
      dataIndex: 'role',
      render: role => <h6 className='h6 text-capitalize'>{(role || '').toLowerCase()}</h6>
    }
  ];

  useEffect(() => {
    if (teamId && team) {
      doGetTeamMembers({
        teamId,
        page: 0,
        limit: MEMBER_PAGE_SIZE,
        isSearching: true
      });
    }
  }, [teamId, team]);

  useEffect(() => {
    const filteredMembers = members.filter(m => hasPermission(m._id)) || [];
    setSelectedMembers(() => selectAll ? filteredMembers.map(m => m._id) : []);
  }, [selectAll]);

  const hasPermission = id => {
    if (!members || (members && members.length === 0)) return false;
    const selectedMember = members.find(mem => mem._id === id);
    const selectedMemberRole = selectedMember ? selectedMember.role : false;

    return false;
  };

  const handlePageChange = page => {
    if (teamId) {
      const params = {
        teamId,
        page,
        limit: MEMBER_PAGE_SIZE
      };

      if (searchValue) {
        params.term = searchValue;
      }

      doGetTeamMembers(params);
    }
  };

  const onMemberSearch = value => {
    let newParams = {
      page: 0,
      limit: MEMBER_PAGE_SIZE,
      isSearching: true
    };
    if (value) newParams.term = value.trim();
    setSearchValue(value);

    if (teamId) {
      newParams = {
        ...newParams,
        teamId
      };
      setSearchLoading(true);

      doGetTeamMembers(newParams, () => {
        setSearchLoading(false);
      }, false);
    }
  };

  const getMemberSettings = data => {
    const { _id } = data;
    doGetMember(_id, () => {
      setMemberSettings(true);
    });
  };

  const setSelectAllMembers = isAll => {
    const filteredMembers = members.filter(m => hasPermission(m._id)) || [];
    setSelectAll(isAll && filteredMembers.length > 0);
  };

  const isMember = () => (getRole(userTeamRole) === MEMBER && team);

  return (
    <>
      <div className='tr__organization-members d-flex flex-column'>
        <div className='wrapper'>
          <Table
            renderHeader={() =>
              <DetailsTableHeader
                label={`${totalMembers} member${totalMembers > 1 ? 's' : ''} are under current ${of}`}
                title='Member List'
                labelButton='Add New Member'
                buttonAdd={!isMember()}
                onAddNewClick={onAddNewClick}
                backUrl={backUrl}
                onSearch={onMemberSearch}
                searchLoading={searchLoading}
              />
            }
            className='members border'
            dataSource={members}
            columns={columns}
            onRowClick={getMemberSettings}
            emptyMessage={searchMessage ? searchMessage : 'No member found'}
          />
          {((members.length > 0 && !isMember()) || (totalPages > 1 && isMember())) && (
            <TableFooter
              onlyPagination={isMember()}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={handlePageChange}
              selectAll={selectAll}
              setSelectAll={setSelectAllMembers}
              selectedMembers={selectedMembers}
              onRemove={() => setRemoveMembers(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

MembersList.propTypes = {
  of: PropTypes.oneOf(['organization', 'team']),
  onAddNewClick: PropTypes.func,
  backUrl: PropTypes.func,
  selectedMembers: PropTypes.array,
  setSelectedMembers: PropTypes.func
};
