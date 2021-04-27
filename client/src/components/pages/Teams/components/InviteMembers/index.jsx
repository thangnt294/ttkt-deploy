import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { AuthContext, HomeContext, TeamContext } from 'contexts';
import { GET_FILE } from 'actions/constants';
import avatar from 'assets/images/avatar.png';
import { MultiSelect, ItemCard } from 'components';
import { getRoleList } from 'utils';
import { ADMIN } from 'actions';

export const InviteMembers = ({
    title,
    isMember,
    name = 'teamRole',
    selectedMembers = [],
    members = [],
    onInputChange = () => {},
    onAddItem = () => {},
    setSelectedMembers = () => {},
    register = () => {},
    errors = [],
    searchLoading = false,
    formState,
    handleAddTeam = () => {},
    getValues = () => {},
}) => {
    const { userInfo } = useContext(AuthContext);
    const { teamMember } = useContext(HomeContext);
    const { team, teams, userTeamRole } = useContext(TeamContext);
    const inviteByEmail = 'Invite by email';

    const handleChange = items => {
        setSelectedMembers(oldValue => [...oldValue, ...items.map(item => {
            return {
                ...item,
                teams: [],
                teamOptions: teams
            }
        })]);
    }

    const handleRemove = item => {
        setSelectedMembers(oldValue => [...oldValue.filter(val => val.id !== item.id)]);
    }

    return (
        <div className="tr__invite-members">
            {title && (
                <h4 className="h2 f-medium text-black">{title}</h4>
            )}
            <MultiSelect
                className="mbx2"
                options={members.filter(mem => !selectedMembers.some(m => m.id === mem._id) && (userInfo._id !== mem._id)).map(member => {
                    return {
                        id: member._id,
                        icon: member._id ? (member.avatar ? member.avatar : avatar) : 'icon-envelop',
                        title: member._id ? member.name : member.email,
                        description: member._id ? member.email : inviteByEmail
                    }
                })}
                name="orgMembers"
                value={selectedMembers}
                placeholder='You can search by name, email'
                onChange={handleChange}
                onInputChange={onInputChange}
                onAddItem={onAddItem}
                onRemove={handleRemove}
                register={register}
                errors={errors}
                formState={formState}
                addButton={true}
                addButtonLabel="Add"
                searchLoading={searchLoading}
                renderList={members => members.length > 0 && (
                    <div className='tr__dropdown--list'>
                        {members && members.length > 0 && members.map((member, memberIndex) => (
                            <ItemCard
                                key={memberIndex}
                                item={member}
                                name={`${name}${member.id}`}
                                onRemove={handleRemove}
                                dropdownOptions={getRoleList().filter(role => role.key !== 'OWNER')}
                                teamOptions={member.teamOptions}
                                getValues={getValues}
                                isMember={isMember}
                                register={register}
                                errors={errors}
                                teams={member.teams}
                                handleAddTeam={() => handleAddTeam(member.id)}
                            />
                        ))}
                    </div>
                )}
            />
        </div>
    )
};

InviteMembers.propTypes = {
    title: PropTypes.string,
    isMember: PropTypes.bool,
    register: PropTypes.func,
    errors: PropTypes.any,
    selectedMembers: PropTypes.array,
    setSelectedMembers: PropTypes.func,
    onInputChange: PropTypes.func,
    onAddItem: PropTypes.func,
    searchLoading: PropTypes.bool,
    formState: PropTypes.any,
    members: PropTypes.array,
    handleAddTeam: PropTypes.func,
    getValues: PropTypes.func,
    isOrgTeam: PropTypes.bool,
    isNew: PropTypes.bool
};
