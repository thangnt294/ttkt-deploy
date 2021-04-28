import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './index.scss';
import { HomeContext, ModalContext, TeamContext } from 'contexts';
import {
	TableHeader,
	Table,
	MembersAvatar,
	DetailInfo,
	TableFooter
} from 'components';
import {
	teamsHeader
} from 'utils';
import { TEAM_DETAILS_URL, TEAM_PAGE_SIZE } from 'actions';

const TeamList = () => {
	const history = useHistory();
	const { setAddTeam } = useContext(ModalContext);
	const { setIsOrgTeamDetails, searchMessage } = useContext(HomeContext);
	const {
		teams,
		doGetTeams,
		currentPage,
		totalPages,
		totalTeams
	} = useContext(TeamContext);
	
	const [searchLoading, setSearchLoading] = useState(false); 
    const columns = [
		{
			dataIndex: 'name,description',
			render: (name, description) => <DetailInfo info={{
				name,
				bio: description
			}} />
        },
        {
			dataIndex: 'members',
			render: members => <MembersAvatar skip={5} members={members} />
        },
        {
			dataIndex: 'members',
			render: members => {
				const memberCount = members ? members.length : 0;
				const label = `${memberCount} member${memberCount === 1 ? '' : 's'}`;
				return (
					<h6 className="h6">{label}</h6>
				)
			}
		},
      {
        dataIndex: 'tasks',
        render: tasks => {
          const taskCount = tasks ? tasks.length : 0;
          const label = `${taskCount} task${taskCount === 1 ? '' : 's'}`;
          return (
            <h6 className="h6">{label}</h6>
          )
        }
      }
	];

	/*eslint-disable */
	useEffect(() => {
		doGetTeams({
			page: 0,
			limit: TEAM_PAGE_SIZE,
			isSearching: true
		});
	}, [])
	/*eslint-enable */

	const showTeamDetails = team => {
		if (team) {
			setIsOrgTeamDetails(false);
			history.push(TEAM_DETAILS_URL.replace(':teamId', team._id));
		}
	}

	const handlePageChange = page => {
		doGetTeams({
			page,
			limit: TEAM_PAGE_SIZE
		});
	}

	const onTeamSearch = value => {
		const newParams = {
			page: 0,
			limit: TEAM_PAGE_SIZE,
			isSearching: true
		};
		if (value) newParams.term = value.trim();
		
		setSearchLoading(true);

		doGetTeams(newParams, () => {
			setSearchLoading(false);
		}, false);
	}

	return (
		<div className="tr__teams box d-flex flex-column page-box">
			<div className="wrapper">
				<Table
					className="teams border"
					dataSource={teams}
					columns={columns}
					// onRowClick={showTeamDetails}
					emptyMessage={searchMessage ? searchMessage : 'No team found'}
				>
					<TableHeader
						items={teamsHeader}
						count={totalTeams}
						title='All Teams List'
						onAddButtonClick={() => setAddTeam(true)}
						labelButton="Add New Team"
						onSearch={onTeamSearch}
						searchLoading={searchLoading}
					/>
				</Table>
				{totalPages > 1 && (
					<TableFooter
						currentPage={currentPage}
						totalPages={totalPages}
						setCurrentPage={handlePageChange}
					/>
				)}
			</div>
		</div>
	)
};

export default TeamList;
