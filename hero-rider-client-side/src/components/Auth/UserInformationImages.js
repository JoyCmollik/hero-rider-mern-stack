import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';
import useRegisterContext from '../../hooks/useRegisterContext';
import ImagesUploader from '../layout/ImagesUploader';

const UserInformationImages = () => {
 const {
		userType,
		profilePic,
		setProfilePic,
		nidPic,
		setNidPic,
		licensePic,
		setLicensePic,
 } = useRegisterContext();

	return (
		<div className='h-full grid grid-cols-2'>
			<div
				className='bg-brand flex justify-center items-center p-10'
				style={{
					background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)) ,url(https://i.ibb.co/ZXv7C4w/01-Royal-Heath.png) center/cover`,
				}}
			>
				<h1 className='text-5xl text-white font-semibold'>
					Let's upload some pictures!
				</h1>
			</div>
			<div className='bg-white p-10 flex flex-col space-y-2 text-dark overflow-y-auto'>
				<div className='flex justify-end'>
					<Link to='/'>Exit to home</Link>
				</div>
				{/* content */}
				<div className='p-4 grid grid-cols-12 gap-4 border rounded-lg'>
					<div className='col-span-12 bg-brand1 rounded-lg p-4 text-white'>
						<label className='label font-medium'>
							Profile Picture
						</label>
						{/* Profile picture */}
						<ImagesUploader
							imageFile={profilePic}
							setImageFile={setProfilePic}
							limit={1}
						/>
					</div>
					<div
						className={`${
							userType === 'rider' ? 'col-span-6' : 'col-span-12'
						} bg-dark rounded-lg p-4 text-white`}
					>
						<label className='label font-medium'>NID Picture</label>
						{/* NID picture */}
						<ImagesUploader
							imageFile={nidPic}
							setImageFile={setNidPic}
							limit={1}
						/>
					</div>
					{userType === 'rider' && (
						<div className='col-span-6 bg-primary rounded-lg p-4 text-white'>
							<label className='label font-medium'>
								Driving License Picture
							</label>
							{/* license picture */}
							<ImagesUploader
								imageFile={licensePic}
								setImageFile={setLicensePic}
								limit={1}
							/>
						</div>
					)}
				</div>
				{/* host footer */}
				<div className='border-t border-para py-4 flex space-x-2 justify-end'>
					<Link to='/register/info'>
						<button
							className={`bg-red-500 text-white font-semibold px-5 py-2 rounded-3xl`}
						>
							Back
						</button>
					</Link>
					<Link to='/register/vehicle'>
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

export default UserInformationImages