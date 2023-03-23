import { Avatar } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { HiOutlineHome } from 'react-icons/hi2';
import { MdOutlineDashboard } from 'react-icons/md';

const Navbar = () => {
	const { user, handleLogout } = useAuth();

	return (
		<div className='container mx-auto flex justify-between items-center bg-primary p-4 rounded-lg'>
			<div className='flex items-center space-x-4'>
				<h4 className='text-xl text-white font-bold'>Hero Rider</h4>
				<div className='flex space-x-2'>
					<Link to='/'>
						<div className='flex items-center text-dark space-x-2 border border-dark px-4 py-2 rounded-lg'>
							<HiOutlineHome size={20} />
							<span>Home</span>
						</div>
					</Link>
					{user && user?.role === 'admin' && (
						<Link to='/dashboard/admin'>
							<div className='flex items-center text-dark space-x-2 border border-dark px-4 py-2 rounded-lg'>
								<MdOutlineDashboard size={20} />
								<span>Dashboard</span>
							</div>
						</Link>
					)}
				</div>
			</div>
			{user && (
				<div className='flex items-center text-white space-x-4'>
					<h5 className='m-0 text-white'>{user?.name}</h5>
					<button
						className='px-4 py-1 border rounded-lg'
						onClick={handleLogout}
					>
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
