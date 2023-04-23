import { message, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LordIcon from '../../components/layout/LordIcon';
import AllUsersTable from './AllUsersTable';

const courseStatList = [
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/gqdnbnwt.json' size={40} />
		),
		value: 14,
		title: 'Total Users',
		dataIndex: 'totalUsers',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/jqeuwnmb.json' size={40} />
		),
		value: 14,
		title: 'Active Learners',
		dataIndex: 'activeLearners',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/kvsszuvz.json' size={40} />
		),
		value: 14,
		title: 'Active Riders',
		dataIndex: 'activeRiders',
	},
	{
		icon: (
			<LordIcon src='https://cdn.lordicon.com/mdgrhyca.json' size={40} />
		),
		value: 14,
		title: 'Blocked Users',
		dataIndex: 'blockedUsers',
	},
];

const initialStat = {
	totalUsers: 0,
	activeLearners: 0,
	activeRiders: 0,
	blockedUsers: 0,
};

const initialTableParams = {
	pagination: {
		current: 1,
		pageSize: 10,
	},
};

const AllUsers = () => {
	const [tableParams, setTableParams] = useState({ ...initialTableParams });
	const [filter, setFilter] = useState(``);
	const [query, setQuery] = useState(``);
	const [isFetching, setIsFetching] = useState(true);
	const [users, setUsers] = useState([]);
	const [filterAge, setFilterAge] = useState({ min: 0, max: 0 });
	const [userStat, setUserStat] = useState({ ...initialStat });
	const [newState, setNewState] = useState(null);
	// ----- row selection -----
	const fetchUsers = (fetchUrl) => {
		setIsFetching(true);
		axios
			.get(fetchUrl)
			.then((response) => {
				setUsers(response.data.users);
				// resetting table
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: response.data.total,
					},
				});
				handleUserStat(response.data.total);
			})
			.catch((error) => {
				message.error(error?.response?.data?.msg);
			})
			.finally(() => {
				setIsFetching(false);
			});
	};

	const handleBlockUsers = (userIds, cb) => {
		axios
			.patch('/users/block-user', { userIds })
			.then((response) => {
				console.log(response.data);
				fetchUsers(
					`/users?page=${tableParams.pagination.current}&limit=${tableParams.pagination.pageSize}${filter}${query}`
				);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				cb();
			});
	};

	useEffect(() => {
		fetchUsers(
			`/users?page=${tableParams.pagination.current}&limit=${tableParams.pagination.pageSize}${filter}${query}`
		);
	}, [JSON.stringify(tableParams), filter]);

	const handleUserStat = (total) => {
		setUserStat({
			totalUsers: total,
			activeLearners: users.filter((u) => u.role === 'learner').length,
			activeRiders: users.filter((u) => u.role === 'biker').length || 0,
			blockedUsers:
				users.filter((u) => u.status === 'blocked').length || 0,
		});
	};

	// ----- row selection -----
	const handleTableChange = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	// ----- row selection -----
	const handleAgeFilters = () => {
		setTableParams({ ...initialTableParams });
		setFilter(() => `&minAge=${filterAge.min}&maxAge=${filterAge.max}`);
	};

	// ----- row selection -----
	const handleSearchQuery = (searchQuery) => {
		setTableParams({ ...initialTableParams });
		setQuery(() => `&search=${searchQuery}`);
	};

	// ----- clear filters -----
	const handleClearFilters = () => {
		setTableParams({ ...initialTableParams });
		setFilter('');
		setQuery('');
		setFilterAge({ min: 0, max: 0 });
	};

	return (
		<div className='p-4 space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Users</h4>
			</div>
			{/*****--------------Course Stats---------------*****/}
			<div className='grid grid-cols-4 gap-4'>
				{courseStatList.map(({ icon, title, dataIndex }, statIdx) => (
					<>
						<div
							key={statIdx}
							className='flex flex-col justify-between items-center space-y-2 border-[0.5px] rounded-lg p-4 drop-shadow-lg'
						>
							{icon}
							<h4 className='text-2xl font-medium '>
								{userStat[dataIndex]}
							</h4>
							<p className='text-dark'>{title}</p>
						</div>
					</>
				))}
			</div>
			<div></div>
			{/*****--------------Courses Table---------------*****/}
			<div className='space-y-8'>
				{/*****--------------Courses Table---------------*****/}
				<div className=''>
					<AllUsersTable
						data={{
							users,
							handleTableChange,
							handleAgeFilters,
							handleClearFilters,
							handleSearchQuery,
							handleBlockUsers,
							tableParams,
							filterAge,
							setFilterAge,
							isFetching,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
