import React from 'react'
import { Link } from 'react-router-dom';
import useRegister from '../../hooks/useRegister';

const vehicleTypeData = [
	{
		id: 1,
		text: 'I have a car.',
		type: 'car',
		image: 'https://www.nicepng.com/png/detail/251-2519394_motorcycle-rider-royalty-free-vector-clip-art-illustration.png',
	},
	{
		id: 2,
		text: 'I have a motor-bike',
		type: 'bike',
		image: 'http://unblast.com/wp-content/uploads/2020/10/Online-Learning-Vector-Illustration.jpg',
	},
];

const VehicleInfo = () => {
    const { user, handleUser, vehicle, handleVehicle, userType } = useRegister();

  return (
		<div className='h-full grid grid-cols-2'>
			<div
				className='bg-brand flex justify-center items-center p-10'
				style={{
					background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)) ,url(https://i.ibb.co/ZXv7C4w/01-Royal-Heath.png) center/cover`,
				}}
			>
				<h1 className='text-5xl text-white font-semibold'>
					Let's choose vehicle!
				</h1>
			</div>
			<div className='bg-white p-10 flex flex-col space-y-2 text-dark'>
				{/* <HostPlaceHeader /> */}
				{/* content */}
				<div className='p-4 space-y-4 border rounded-lg'>
					<div className='space-y-2'>
							{vehicleTypeData.map(
								({ id, text, image, type }) => (
									<button
										key={id}
										onClick={() =>
											handleUser(
												null,
												'vehicleType',
												type
											)
										}
										className={`bg-white p-4 flex justify-between items-center w-full rounded-lg border-2 hover:border-para ${
											user?.vehicleType &&
											user?.vehicleType === type
												? 'border-brand1'
												: 'border-gray-200'
										}`}
									>
										<h4 className='text-xl font-semibold'>
											{text}
										</h4>
										<img
											className='object-cover h-14 rounded-lg'
											src={image}
											alt='type'
										/>
									</button>
								)
							)}
					</div>
					{userType === 'rider' && (
						<div className='border rounded-lg grid grid-cols-12 gap-4 p-4'>
							{/* form input - full name */}
							<div className='col-span-6 flex flex-col space-y-1'>
								<label className='label font-medium'>
									Vehicle Name
								</label>
								<input
									type='text'
									placeholder='Type your full name'
									name='name'
									className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
									value={vehicle?.area}
									onChange={handleVehicle}
								/>
							</div>
							{/* form input - full name */}
							<div className='col-span-6 flex flex-col space-y-1'>
								<label className='label font-medium'>
									Vehicle Model
								</label>
								<input
									type='text'
									placeholder='Type your full name'
									name='model'
									className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
									value={vehicle?.model}
									onChange={handleVehicle}
								/>
							</div>
							{/* form input - full name */}
							<div className='col-span-12 flex flex-col space-y-1'>
								<label className='label font-medium'>
									Vehicle Name Palate
								</label>
								<input
									type='text'
									placeholder='Type your full name'
									name='namePalate'
									className='p-2 border rounded-lg outline-none focus-within:border-x-brand1'
									value={vehicle?.namePalate}
									onChange={handleVehicle}
								/>
							</div>
						</div>
					)}
				</div>
				{/* host footer */}
				<div className='border-t border-para py-4 flex space-x-2 justify-end'>
					<Link to='/register/photos'>
						<button
							className={`bg-red-500 text-white font-semibold px-5 py-2 rounded-3xl`}
						>
							Back
						</button>
					</Link>
					<Link to='/register/finish'>
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
}

export default VehicleInfo