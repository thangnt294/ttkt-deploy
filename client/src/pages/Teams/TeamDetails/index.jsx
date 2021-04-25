import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import {
	Tab,
	TabPane,
    TeamDetailsForm,
	MembersList,
	ActivitiesLog,
	DeleteConfirmation
} from 'components';
import { AuthContext, HomeContext, MemberContext, ModalContext, TeamContext } from 'contexts';
import { TEAMS_URL, TEAM_DETAILS_URL } from 'actions';
import {TeamTasks} from "../TeamTasks";

const TeamDetails = () => {
	const history = useHistory();
	const location = useLocation();
	const { teamId } = useParams();
	const { userInfo } = useContext(AuthContext);
	const { setAddMember, deleteTeam, setDeleteTeam, removeMembers, setRemoveMembers } = useContext(ModalContext);
	const { setTeamMember, setBreadcrums, setNotificationMessage, backToTeamListUrl } = useContext(HomeContext);
	const { team, setTeam, doGetTeam, doDeleteTeam } = useContext(TeamContext);
	const { doRemoveMembers } = useContext(MemberContext);

	const [selectedMembers, setSelectedMembers] = useState([]);
	/*eslint-disable */
	useEffect(() => {
			doGetTeam(teamId);

		return () => {
			setTeam(null);
		}
	}, [])

	useEffect(() => {
		if (team) {
			setBreadcrums([
				{
					name: 'Teams',
					url: TEAMS_URL
				},
				{
					name: team.name,
					url: TEAM_DETAILS_URL.replace(':teamId', teamId)
				}
			]);
		}
	}, [team, location])
	/*eslint-enable */

	const removeTeam = () => {
        if (team) {
            const { _id, name } = team;

            doDeleteTeam(_id, () => {
				setNotificationMessage(`${name} team has been deleted!`);
				setDeleteTeam(false);
				backToTeamListUrl(history, location);
            });
        }
	}
	
	const handleRemoveMembers = () => {
		if (team) {
			const { _id, name } = team;

			const payload = {
				memberIds: selectedMembers,
				teamIds: [_id]
			};

			doRemoveMembers(payload, () => {
				setSelectedMembers([]);
				setRemoveMembers(false);

				if (userInfo && selectedMembers.some(id => id === userInfo._id)) {
					setNotificationMessage(`You has left ${name} team!`);
					backToTeamListUrl(history, location);
				} else {
					setNotificationMessage(`${selectedMembers.length} member${selectedMembers.length > 1 ? 's' : ''} has been removed from ${name} team!`);
				}
			}, () => {
				setRemoveMembers(false);
			})
		}
	}

	return (
		<div className="tr__organization-details page-box">
			<Tab className="minimal" initialTab={0} onTabClick={tab => console.log(tab)}>
				<TabPane tabName="Details" tabSlug='details'>
					<TeamDetailsForm />
				</TabPane>
				<TabPane tabName="Members" tabSlug='members'>
					<MembersList
						of="team"
						backUrl={() => backToTeamListUrl(history, location)}
						onAddNewClick={() => {
							setTeamMember(true);
							setAddMember(true);
						}}
						selectedMembers={selectedMembers}
						setSelectedMembers={setSelectedMembers}
					/>
				</TabPane>
				<TabPane tabName="Tasks" tabSlug='tasks'>
                    <TeamTasks
						backUrl={() => backToTeamListUrl(history, location)}
					/>
				</TabPane>
			</Tab>
			<DeleteConfirmation
                open={deleteTeam}
                onCancel={() => setDeleteTeam(false)}
				onSubmit={removeTeam}
				message={`Once deleted, all team information will be gone forever. Are you sure you want to delete ${(team && team.name) || 'this'} team?`}
            />
			<DeleteConfirmation
                open={removeMembers}
                onCancel={() => setRemoveMembers(false)}
				onSubmit={handleRemoveMembers}
				title="Remove confirmation"
				message={`Are you sure you want to remove selected members?`}
            />
		</div>
	)
};

export default TeamDetails;
