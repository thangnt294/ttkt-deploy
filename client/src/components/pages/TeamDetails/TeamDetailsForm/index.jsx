import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './index.scss';
import { HomeContext, TeamContext } from 'contexts';
import {
    TeamDetails,
    DetailsTableHeader
} from 'components';


export const TeamDetailsForm = () => {
    const history = useHistory();
    const location = useLocation();

    const { handleSubmit, register, errors, reset } = useForm();
    const { team, doUpdateTeam } = useContext(TeamContext);
    const { setNotificationMessage, backToTeamListUrl } = useContext(HomeContext);

    const [isEdit, setIsEdit] = useState(false);

    const doEditTeam = data => {
        if (team) {
            const {
                teamName,
                teamDescription
            } = data;

            const { _id } = team;

            const payload = {
                name: teamName,
                description: teamDescription
            }

            doUpdateTeam(_id, payload, async () => {
                await setIsEdit(true);
                await setIsEdit(false);
                setNotificationMessage(`
                    <p><strong>${payload.name}</strong> team has been updated successfully!</p>
                `);
            })
        }
    }

    return (
        <form className="tr__team-details-form" onSubmit={handleSubmit(doEditTeam)}>
            <TeamDetails
                isModalForm={false}
                title="Team Details"
                register={register}
                errors={errors}
                reset={reset}
                isEditable={isEdit}
                isNew={true}
            >
                <DetailsTableHeader
                    backUrl={() => backToTeamListUrl(history, location)}
                    actionButton={false}
                />
            </TeamDetails>
        </form>
    )
};
