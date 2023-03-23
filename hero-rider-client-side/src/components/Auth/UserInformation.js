import React from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import useRegisterContext from '../../hooks/useRegisterContext';

const UserInformation = () => {
    const { user, handleUser, userType } = useRegisterContext();
	return (
		<div className='h-full grid grid-cols-2'>
			<div
				className='bg-brand flex justify-center items-center p-10'
				style={{
					background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)) ,url(https://i.ibb.co/ZXv7C4w/01-Royal-Heath.png) center/cover`,
				}}
			>
				<h1 className='text-5xl text-white font-semibold'>
					Let's get to know yourself.
				</h1>
			</div>
			<div className='bg-white p-10 flex flex-col space-y-2 text-dark'>
				<div className='flex justify-end'>
					<Link to='/'>Exit to home</Link>
				</div>
				{/* content */}
				<div className='p-4 grid grid-cols-12 gap-4 border rounded-lg'>
					{/* form input - full name */}
					<div className='col-span-12 flex flex-col space-y-1'>
						<label className='label font-medium'>Full Name</label>
						<input
							type='text'
							placeholder='Type your full name'
							name='name'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.name}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>Email</label>
						<input
							type='text'
							placeholder='Type your email'
							name='email'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.email}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>Age</label>
						<input
							type='number'
							placeholder='Type your age'
							name='age'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.age}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>Password</label>
						<input
							type='password'
							placeholder='Type your secret password'
							name='password'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.password}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>
							Confirm Password
						</label>
						<input
							type='password'
							placeholder='Type your full name'
							name='confirmPassword'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.confirmPassword}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-12 flex flex-col space-y-1'>
						<label className='label font-medium'>Phone</label>
						<input
							type='text'
							placeholder='Type your full name'
							name='phone'
							pattern='^(?:\+8801|\+880\s?1|01)?[13-9]\d{8}$'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.phone}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>City</label>
						<input
							type='text'
							placeholder='Type your full name'
							name='city'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.city}
							onChange={handleUser}
						/>
					</div>
					{/* form input - full name */}
					<div className='col-span-6 flex flex-col space-y-1'>
						<label className='label font-medium'>Area</label>
						<input
							type='text'
							placeholder='Type your full name'
							name='area'
							className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
							value={user?.area}
							onChange={handleUser}
						/>
					</div>
				</div>
				{/* host footer */}
				<div className='border-t border-para py-4 flex space-x-2 justify-end'>
					<Link to='/register'>
						<button
							className={`bg-red-500 text-white font-semibold px-5 py-2 rounded-3xl`}
						>
							Back
						</button>
					</Link>
					<Link to='/register/photos'>
						<button
							className={`${
								!true
									? 'bg-gray-400 text-black'
									: 'bg-brand1 text-white'
							} font-semibold px-5 py-2 rounded-3xl`}
							disabled={true ? false : true}
						>
							Next
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserInformation;
