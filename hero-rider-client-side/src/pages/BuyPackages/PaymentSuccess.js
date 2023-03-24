import React, { useEffect, useState } from 'react';
import Navbar from '../../components/layout/Navbar';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/', { replace: true });
		}, 2500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='min-h-screen bg-dark p-4 space-y-4 flex flex-col'>
			<Navbar></Navbar>
			<div className='flex-grow h-full bg-white rounded-lg container mx-auto grid grid-cols-12 gap-4 p-4'>
				{/* package information */}
				<div className='h-full col-span-12 bg-brand1 rounded-lg flex flex-col justify-center items-center'>
					<lottie-player
						autoplay
						loop
						background='transparent'
						src='https://assets10.lottiefiles.com/packages/lf20_EQDsH8Z54K.json'
						style={{
							width: `400px`,
							height: `400px`,
						}}
					/>
					<h4 className='text-white text-lg font-bold my-2'>
						Payment Successful! Redirecting to home....
					</h4>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
