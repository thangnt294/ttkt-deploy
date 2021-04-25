import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import './index.scss';
import {
    Table,
    MembersAvatar,
    DetailInfo,
    DetailsTableHeader,
    TableFooter
} from 'components';
import {
    ORGANIZATIONS_LIST_URL,
    TEAM_DETAILS_URL,
    TEAM_PAGE_SIZE
} from 'actions';
import { HomeContext, TeamContext } from 'contexts';

export const TeamsList = ({ onAddNewClick }) => {
    const { orgId } = useParams();
    const history = useHistory();
	const { setIsOrgTeamDetails, searchMessage } = useContext(HomeContext);
	const {
		teams,
		doGetOrgTeams,
		currentPage,
        totalPages,
        totalTeams
    } = useContext(TeamContext);

    const [searchValue, setSearchValue] = useState();
    const [searchLoading, setSearchLoading] = useState(false); 
    const columns = [
		{
			dataIndex: 'base,_id,name,description',
			render: (base, _id, name, description) => <DetailInfo info={{
				name: base?.delete ? "deleted_" + _id : name,
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
		}
    ];
    
    /*eslint-disable */
	useEffect(() => {
		if (orgId) {
            doGetOrgTeams({
                orgId,
                page: 0,
                limit: TEAM_PAGE_SIZE,
                isSearching: true
            });
        }
	}, [orgId])
    /*eslint-enable */
    
    const showTeamDetails = team => {
		if (team) {
            setIsOrgTeamDetails(true);
			history.push({
                pathname: `${TEAM_DETAILS_URL.replace(':teamId', team._id)}`,
                hash: orgId,
                state: {
                    orgId
                }
            });
		}
    }

    const handlePageChange = page => {
		if (orgId) {
            const params = {
                orgId,
                page,
                limit: TEAM_PAGE_SIZE
            };
    
            if (searchValue) {
                params.name = searchValue;
            }

            doGetOrgTeams(params);
        }
    }
    
    const onTeamSearch = value => {
		if (orgId) {
            const newParams = {
                orgId,
                page: 0,
                limit: TEAM_PAGE_SIZE,
                isSearching: true
            };
            if (value) newParams.name = value.trim();

            setSearchLoading(true);
            setSearchValue(value)

            doGetOrgTeams(newParams, () => {
                setSearchLoading(false);
            }, false);
        }
	}

	return (
		<div className="tr__organization-teams d-flex flex-column">
			<div className="wrapper">
                <Table
                    renderHeader={() => 
                        <DetailsTableHeader
                            label={`${totalTeams} active team${totalTeams > 1 ? 's' : ''} under current organization`}
                            backUrl={() => {
                                history.push(ORGANIZATIONS_LIST_URL)
                            }}
                            title="Teams List"
                            labelButton='Add New Team'
                            onAddNewClick={onAddNewClick}
                            onSearch={onTeamSearch}
                            searchLoading={searchLoading}
                        >
                        </DetailsTableHeader>
                    }
                    className="teams border"
                    dataSource={teams}
                    columns={columns}
                    onRowClick={showTeamDetails}
                    emptyMessage={searchMessage ? searchMessage : 'No team found'}
                />
            </div>
            {totalPages > 1 && (
                <TableFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={handlePageChange}
                />
            )}
		</div>
	)
};

TeamsList.propTypes = {
    onAddNewClick: PropTypes.func
};
