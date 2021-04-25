import {Brand, DetailInfo, Dropdown, IssuesHeader, MembersAvatar, Table, TableFooter, TableHeader} from 'components';
import React, {useContext, useEffect, useState} from 'react';
import {sampleOptions, teamsHeader} from 'utils';
import './index.scss'
import {HomeContext, ModalContext, TeamContext} from "../../../contexts";
import {TEAM_DETAILS_URL, TEAM_PAGE_SIZE} from "../../../actions";
import {useHistory} from 'react-router-dom';

const AllIssues = () => {
    const history = useHistory();
    const {setAddTeam} = useContext(ModalContext);
    const [searchLoading, setSearchLoading] = useState(false);
    const {searchMessage} = useContext(HomeContext);
    const {
        teams,
        doGetTeams,
        currentPage,
        totalPages,
        totalTeams
    } = useContext(TeamContext);

    const columns = [
        {
            dataIndex: 'name,description',
            render: (name, description) => <DetailInfo info={{
                name,
                bio: description
            }}/>
        },
        {
            dataIndex: 'members',
            render: members => <MembersAvatar skip={5} members={members}/>
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
    ]

    useEffect(() => {
        doGetTeams({
            page: 0,
            limit: TEAM_PAGE_SIZE,
            isSearching: true
        });
    }, [])

    const showTeamDetails = team => {
        if (team) {
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
            name: value,
            isSearching: true
        };
        if (value) newParams.name = value.trim();

        setSearchLoading(true);

        doGetTeams(newParams, () => {
            setSearchLoading(false);
        }, false);
    }

    return (
        <div className="tr__all-issues page-box">
            <h1 className="h1 f-medium mtbx2">All Teams</h1>
            <div className="tr__all-issues__card box">
                <Table
                    className="teams border"
                    dataSource={teams}
                    columns={columns}
                    onRowClick={showTeamDetails}
                    emptyMessage={searchMessage ? searchMessage : 'No team found'}
                >
                    <TableHeader
                        items={teamsHeader}
                        count={totalTeams}
                        title='Teams List'
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

export default AllIssues;
