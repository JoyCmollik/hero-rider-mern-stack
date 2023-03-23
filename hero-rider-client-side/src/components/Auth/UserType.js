import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import useRegisterContext from '../../hooks/useRegisterContext';

const userTypeData = [
	{
		id: 1,
		type: 'I am a rider.',
        role: 'rider',
		image: 'https://www.nicepng.com/png/detail/251-2519394_motorcycle-rider-royalty-free-vector-clip-art-illustration.png',
	},
	{
		id: 2,
		type: 'I want to learn riding',
        role: 'learner',
		image: 'http://unblast.com/wp-content/uploads/2020/10/Online-Learning-Vector-Illustration.jpg',
	},
];

const UserType = () => {
    const { userType, handleUserType } = useRegisterContext();
	return (
		<div className='h-full grid grid-cols-2'>
			<div
				className='bg-brand flex justify-center items-center p-10'
				style={{
					background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)) ,url(https://i.ibb.co/ZXv7C4w/01-Royal-Heath.png) center/cover`,
				}}
			>
				<h1 className='text-5xl text-white font-semibold'>
					Which Role Defines You?
				</h1>
			</div>
			<div className='bg-white p-10 flex flex-col text-dark'>
				{/* <HostPlaceHeader /> */}
				{/* content */}
				<div className='flex-grow flex flex-col space-y-4 justify-center items-center'>
					{userTypeData.map(({ id, type, image, role }) => (
						<button
							key={id}
							onClick={() => handleUserType(role)}
							className={`p-4 flex justify-between items-center w-8/12 rounded-lg border hover:border-para ${
								userType && userType === role
									? 'border-brand1'
									: 'border-gray-200'
							}`}
						>
							<h4 className='text-xl font-semibold'>{type}</h4>
							<img
								className='object-cover h-14 rounded-lg'
								src={image}
								alt='type'
							/>
						</button>
					))}
				</div>
				{/* host footer */}
				<div className='border-t border-para py-4 flex justify-end'>
					<Link to='/register/info'>
						<button
							className={`${
								!userType
									? 'bg-gray-400 text-black'
									: 'bg-brand1 text-white'
							} font-semibold px-5 py-2 rounded-3xl`}
							disabled={userType ? false : true}
						>
							Next
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserType