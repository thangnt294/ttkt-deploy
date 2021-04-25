import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { TEAM } from 'actions';

export const MembersAvatar = ({ className = '', members = [], skip, onClick = () => {} }) => {
    const [limit] = useState(skip || members.length);

    return members.length > 0 ? (
        <div className={`tr__organization-members-avatar d-flex align-items-center ${className} ${onClick ? 'hoverable' : ''}`} onClick={onClick}>
            {members.slice(0, limit).map((member, memberIndex) => (
                <div className="tr__organization-members-avatar--item" key={memberIndex}>
                    {member.type && member.type === TEAM.toUpperCase() ? (
                        <i className="icon icon-users" />
                    ) : (
                        <img src={member.avatar} alt={member.name} />
                    )}
                </div>
            ))}
            {members.length === 1 && (
                <p className="mlx1" title={members[0].name}>{members[0].name}</p>
            )}
            {limit < members.length && (
                <div className="tr__organization-members-avatar--item">
                    <span className='f-medium'>+{members.length - limit}</span>
                </div>
            )}
        </div>
    ) : '';
};

MembersAvatar.propTypes = {
    className: PropTypes.string,
    members: PropTypes.array,
    skip: PropTypes.number,
    onClick: PropTypes.func
}
