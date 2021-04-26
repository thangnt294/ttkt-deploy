import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Dropdown } from 'components';
import { AuthContext, HomeContext } from 'contexts';
import { getErrorMessage, getRoleList } from 'utils';


export const ItemCard = ({
    type = 'member',
    name = 'teamRole',
    teams = [],
    teamOptions = [],
    cardOnly,
    removeLabel,
    item,
    dropdownOptions = [],
    orgDropdownOptions = [],
    onRemove = () => {},
    isMember = true,
    register = () => {},
    errors = [],
    handleAddTeam = () => {},
    getValues = () => {},
    disabled = false,
    isRemovable = true
}) => {
    const { teamMember } = useContext(HomeContext);
    const { userOrg } = useContext(AuthContext);

    const isRoleType = () => type === 'role';
    
    const getSelectedValue = key => {
        const selectedOption = dropdownOptions.find(o => o.key === key);
        return selectedOption ? selectedOption.value : '';
    }

    const getTeamRoles = teamId => {
        const isBelongsTo = userOrg && userOrg.teams ? userOrg.teams.find(t => t.teamId === teamId) : null;
        
        if (isBelongsTo) {
            return getRoleList(isBelongsTo.roleName);
        }
        else return dropdownOptions;
    }

    return item ? (
        <div className={`tr__item-card ${isRoleType() ? 'role' : ''} d-flex align-items-center justify-content-between flex-wrap`}>
            <div className="left-column d-flex align-items-center">
                <div className='info d-flex align-items-center'>
                    {isRemovable && (
                        <>
                            {removeLabel ? (
                                <p className="remove-btn" onClick={() => onRemove(item)}>{removeLabel}</p>
                            ) : (
                                <i className="remove-btn icon-times" onClick={() => onRemove(item)} />
                            )}
                        </>
                    )}

                    {/* {item.icon && (item.icon > -1 ? (
                        <i className={item.icon} />
                    ) : ( */}
                        <img src={item.icon} alt={item.title} />
                    {/* ))} */}
                </div>
                {item.title && (
                    <div className="info-member">
                        <h6 className="f-medium h6 text-left plrx2">{item.title}</h6>
                        <p className="plrx2">{item.description}</p>
                    </div>
                )}
            </div>
            
            {!cardOnly && (
                <>
                    <div className="right-column">
                        {isMember && !teamMember && (
                            <Dropdown
                                mode="select"
                                className="list-dropdown"
                                name={`orgRole${item.id}`}
                                icon="icon-chevron-down"
                                iconPosition="right"
                                defaultValue={orgDropdownOptions[orgDropdownOptions.length - 1]}
                                options={orgDropdownOptions}
                                dropdownPosition="center"
                                placeholder="Role in Organization"
                                refs={register({ required: true })}
                                error={!!errors[`orgRole${item.id}`]}
                                errorMessage={getErrorMessage(errors[`orgRole${item.id}`], "Organization role")}
                                disabled={disabled}
                            />
                        )}
                        {(!isMember || teamMember) && (
                            <Dropdown
                                mode="select"
                                className="list-dropdown"
                                icon="icon-chevron-down"
                                name={name}
                                defaultValue={item && item.role ? {
                                    key: item.role,
                                    value: getSelectedValue(item.role)
                                } : dropdownOptions[dropdownOptions.length - 1]}
                                iconPosition="right"
                                options={dropdownOptions}
                                dropdownPosition="center"
                                placeholder="Select Role"
                                refs={register({ required: true })}
                                error={!!errors[`${name}${item.id}`]}
                                errorMessage={getErrorMessage(errors[`${name}${item.id}`], "Team role")}
                                disabled={disabled}
                            />
                        )}
                    </div>
                    {isMember && !teamMember && (
                        <>
                            <div className="add-team d-flex align-items-center flex-wrap">
                                {teams.map((team, teamIndex) => (
                                    <React.Fragment key={teamIndex}>
                                        <Dropdown
                                            mode="select"
                                            className="list-dropdown selectTeam mtx2"
                                            name={`team${teamIndex}${item.id}`}
                                            icon="icon-chevron-down"
                                            iconPosition="right"
                                            options={teamOptions.filter(team => !teams.some((t, tIndex) => team._id === getValues(`team${tIndex}${item.id}`))).map(team => {
                                                return {
                                                    key: team._id,
                                                    value: team.name
                                                }
                                            })}
                                            dropdownPosition="center"
                                            placeholder="Choose team"
                                            refs={register({ required: true })}
                                            error={!!errors[`team${teamIndex}${item.id}`]}
                                            errorMessage={getErrorMessage(errors[`team${teamIndex}${item.id}`], "Team")}
                                            disabled={disabled}
                                        />
                                        <Dropdown
                                            mode="select"
                                            className="list-dropdown mtx2"
                                            name={`teamRole${teamIndex}${item.id}`}
                                            icon="icon-chevron-down"
                                            iconPosition="right"
                                            options={getTeamRoles(getValues(`team${teamIndex}${item.id}`))}
                                            defaultValue={dropdownOptions[dropdownOptions.length - 1]}
                                            dropdownPosition="center"
                                            placeholder="Role in Team"
                                            refs={register({ required: true })}
                                            error={!!errors[`teamRole${teamIndex}${item.id}`]}
                                            errorMessage={getErrorMessage(errors[`teamRole${teamIndex}${item.id}`], "Team Role")}
                                            disabled={disabled}
                                        />
                                    </React.Fragment>
                                ))}

                                <p className={`tr__link mtx2 ${teams.length === teamOptions.length ? 'disabled' : ''}`} onClick={handleAddTeam}>
                                    <i className="icon-plus" />
                                    <span>Add{teams.length > 0 ? ' more' : ''} team</span>
                                </p>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    ) : '';
};

ItemCard.propTypes = {
    type: PropTypes.oneOf(['role', 'member']),
    name: PropTypes.string,
    removeLabel: PropTypes.string,
    item: PropTypes.object,
    onRemove: PropTypes.func,
    dropdownOptions: PropTypes.array,
    cardOnly: PropTypes.bool,
    register: PropTypes.func,
    errors: PropTypes.any,
    teams: PropTypes.array,
    handleAddTeam: PropTypes.func,
    teamOptions: PropTypes.array,
    getValues: PropTypes.func,
    disabled: PropTypes.bool,
    orgDropdownOptions: PropTypes.array,
    isRemovable: PropTypes.bool
};