import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import avatar from 'assets/images/avatar.png';
import {
    Button,
    Tooltip
} from 'components';
import { CONSIGNEE, EXPORT_CUSTOMS, EXPORT_LOGISTICS, FREIGHT, IMPORT_CUSTOMS, IMPORT_LOGISTICS, SHIPPER, TEAM } from 'actions';

export const Member = ({ createdDate, minimal, member, skip, onRemove, roles, isClosed = false, hasOrgName = false, characters }) => {

    const getIcon = (role) => {
        let icon = '';
        switch (role) {
            case IMPORT_CUSTOMS:
                icon = 'icon-import';
                break;
            case EXPORT_CUSTOMS:
                icon = 'icon-export';
                break;
            case IMPORT_LOGISTICS:
                icon = 'icon-box-import';
                break;
            case EXPORT_LOGISTICS:
                icon = 'icon-box-export';
                break;
            case FREIGHT:
                icon = 'icon-truck';
                break;
            case CONSIGNEE:
                icon = 'icon-box';
                break;
            case SHIPPER:
                icon = 'icon-shipper';
                break;
            default:
        }
        return icon;
    }

    return member ? (
        <div className={`tr__member d-flex align-items-center justify-content-between ${minimal ? 'minimal' : ''}`}>
            {!minimal && (
                <Button
                    type="secondary"
                    className="icon"
                    icon="icon-times"
                    onClick={() => onRemove(member)}
                    disabled={isClosed}
                />
            )}
            {member.type && member.type === TEAM.toUpperCase() ? (
                <i className="icon icon-users" />
            ) : (
                <img src={member.avatar || avatar} alt={member.name} />
            )}
            {member && member?.name?.length > characters ? (
                <Tooltip content= {member.name}>
                     <h5 className="h5 f-medium has-tooltip">{member.name}</h5>
                </Tooltip>
            ) : (
                <h5 className="h5 f-medium">{member.base?.delete ? "deleted_" + (member._id || member.id) : member.name}</h5>
            )}
            {/* <h5 className="h5 f-medium">{member.name}</h5> */}
            {hasOrgName && (
                <>
                    {member && member.orgName.length > characters ? (
                        <Tooltip content= {member.orgName}>
                            <h5 className="h5 f-medium has-tooltip mlx2">{member.orgName}</h5>
                        </Tooltip>
                    ) : (
                        <h5 className="h5 f-medium">{member.orgName}</h5>
                    )
                }
                </>
            )}
            <div className="tr__member--roles">
                {/* {createdDate ? (
                    <p className='f-medium'>{createdDate}</p>
                ) : getRoles(member).map((role, roleIndex) => (
                    <i className={role} key={roleIndex} />
                ))} */}
                {createdDate && <p className='f-medium'>{createdDate}</p>}
                {skip && skip < member.roles.length && (
                    <Tooltip
                        position="right"
                        renderContent={() => (
                            <div className="tags d-flex flex-column">
                                {member.roles.slice(skip, member.roles.length).map((role, roleIndex) => (
                                    <i className={role} key={roleIndex} />
                                ))}
                            </div>
                        )}
                    >
                        <span className="f-medium more">+{member.roles.length - skip}</span>
                    </Tooltip>
                )}
                {roles && roles.length > 0 && (
                    <div className="role-icons d-flex">
                        {roles.map((role, roleIndex) => (
                            <i className={`${getIcon(role)}`} key={roleIndex} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    ) : '';
};

Member.propTypes = {
    member: PropTypes.object,
    onRemove: PropTypes.func,
    minimal: PropTypes.bool,
    createdDate: PropTypes.string,
    skip: PropTypes.number,
    isClosed: PropTypes.bool,
    hasOrgName: PropTypes.bool
};
