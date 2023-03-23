import React, { useState } from 'react';
import { Input, Avatar, Button, Table, Tag } from 'antd';
const { Search } = Input;

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		render: (value, data) => {
			return (
				<div className='flex items-center'>
					<Avatar src={data?.avatarURL} />
					<p className='m-0'>{value}</p>
				</div>
			);
		},
	},
	{
		title: 'Email',
		dataIndex: 'email',
	},
	{
		title: 'Age',
		dataIndex: 'age',
	},
	{
		title: 'Phone',
		dataIndex: 'phone',
	},
	{
		title: 'Role',
		dataIndex: 'role',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		render: (value) => {
			return <Tag color={`${value === 'active' ? 'green' : 'red'}`}>{value}</Tag>;
		},
	},
];

const AllUsersTable = ({ data }) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [loading, setLoading] = useState(false);

	const {
		users,
		isFetching,
		handleAgeFilters,
		handleBlockUsers,
		handleClearFilters,
		handleSearchQuery,
		handleTableChange,
		tableParams,
		filterAge,
		setFilterAge,
	} = data;

	// ----- row selection -----
	const start = () => {
		setLoading(true);
		// ajax request after empty completing
		handleBlockUsers(selectedRowKeys, () => {
			setSelectedRowKeys([]);
			setLoading(false);
		});
	};

	// ----- row selection -----
	const onSelectChange = (newSelectedRowKeys) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	// ----- row selection -----
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const hasSelected = selectedRowKeys.length > 0;

	return (
		<div>
			<div
				className='flex justify-between items-center'
				style={{
					marginBottom: 16,
				}}
			>
				{/* block users */}
				<Button
					type='primary'
					onClick={start}
					disabled={!hasSelected}
					loading={loading}
				>
					Block Users
				</Button>
				<span
					style={{
						marginLeft: 8,
					}}
				>
					{hasSelected
						? `Selected ${selectedRowKeys.length} items`
						: ''}
				</span>
				{/* search query */}
				<div className='flex-grow flex justify-center items-center'>
					<Search
						style={{
							maxWidth: 450,
						}}
						placeholder='Search with name, email or phone'
						loading={false}
						onSearch={(value) => handleSearchQuery(value)}
					/>
				</div>
				{/* age filter */}
				<div>
					<Input.Group compact>
						<Input
							type='Number'
							addonBefore='Age'
							style={{
								width: 150,
								textAlign: 'center',
							}}
							placeholder='Minimum'
							value={filterAge.min}
							onChange={(e) =>
								setFilterAge({
									...filterAge,
									min: e.target.value,
								})
							}
						/>
						<Input
							className='site-input-split'
							style={{
								width: 30,
								borderLeft: 0,
								borderRight: 0,
								pointerEvents: 'none',
							}}
							placeholder='~'
							disabled
						/>
						<Input
							type='Number'
							className='site-input-right'
							style={{
								width: 100,
								textAlign: 'center',
							}}
							placeholder='Maximum'
							value={filterAge.max}
							onChange={(e) =>
								setFilterAge({
									...filterAge,
									max: e.target.value,
								})
							}
						/>
						<Button onClick={handleAgeFilters} type='primary'>
							Filter
						</Button>
					</Input.Group>
				</div>
			</div>
			{/* clear filters */}
			<button
				className='block my-2 px-4 py-2 border rounded-lg ml-auto text-dark'
				onClick={handleClearFilters}
			>
				Clear Filters
			</button>
			<Table
				rowSelection={rowSelection}
				rowKey='_id'
				columns={columns}
				dataSource={users}
				pagination={tableParams.pagination}
				onChange={handleTableChange}
				loading={isFetching}
			/>
		</div>
	);
};

export default AllUsersTable;
