import { MembersAvatar } from 'components/pages/Organizations';
import React from 'react';
import PropTypes from 'prop-types';

export const Collaborators = ({ members = [], skip, onAvatarsClick, noneButton = false }) => {
    return (
        <div className="tr__collaborators d-flex align-items-center">
            {members.length > 0 && (
                <MembersAvatar
                    className="small"
                    members={members}
                    skip={skip}
                    onClick={onAvatarsClick}
                    noneButton={noneButton}
                />
            )}
        </div>
    )
};

Collaborators.propTypes = {
    members: PropTypes.array,
    skip: PropTypes.number,
    onAdd: PropTypes.func,
    onAvatarsClick: PropTypes.func,
    label: PropTypes.string,
    done: PropTypes.bool,
};
