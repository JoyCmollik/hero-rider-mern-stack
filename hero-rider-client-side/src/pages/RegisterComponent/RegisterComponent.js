import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import FinishRegister from '../../components/Auth/FinishRegister';
import UserInformation from '../../components/Auth/UserInformation';
import UserInformationImages from '../../components/Auth/UserInformationImages';
import UserType from '../../components/Auth/UserType';
import VehicleInfo from '../../components/Auth/VehicleInfo';
import Navbar from '../../components/layout/Navbar';
import RegisterProvider from '../../contexts/RegisterProvider';

const RegisterComponent = () => {
	return (
		<div className='h-screen space-y-4 bg-dark p-4 flex flex-col'>
			<div>
				<Navbar />
			</div>
			<div className='flex-grow bg-white rounded-lg container mx-auto justify-center items-center overflow-hidden'>
				<RegisterProvider>
					<Routes>
						<Route index element={<UserType />} />
						<Route path='info' element={<UserInformation />} />
						<Route
							path='photos'
							element={<UserInformationImages />}
						/>
						<Route path='vehicle' element={<VehicleInfo />} />
						<Route path='finish' element={<FinishRegister />} />
					</Routes>
				</RegisterProvider>
			</div>
		</div>
	);
};

export default RegisterComponent;
