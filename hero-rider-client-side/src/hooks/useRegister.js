import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const initialUser = {
	name: '',
	email: '',
	age: '',
	phone: '',
	city: '',
	area: '',
	role: '',
	password: '',
	confirmPassword: '',
	vehicleType: '',
};

const initialVehicle = {
	name: '',
	model: '',
	namePalate: '',
};

const useRegister = () => {
	const [userType, setUserType] = useState(null);
	const [vehicleType, setVehicleType] = useState(null);
	const [user, setUser] = useState({ ...initialUser });
	const [vehicle, setVehicle] = useState({ ...initialVehicle });
	const [profilePic, setProfilePic] = useState([]);
	const [nidPic, setNidPic] = useState([]);
	const [licensePic, setLicensePic] = useState([]);

	// API REQUESTS
	const handleRegisterUser = (navigate) => {
		if (userType === 'rider') {
			user.vehicle = { ...vehicle };
			user.licenseURL = licensePic;
		}

		user.role = userType;
		user.avatarURL = profilePic;
		user.nidURL = nidPic;
		user.vehicleType = vehicleType;
		console.log(user);
		axios
			.post('/auth/register', user)
			.then((response) => {
				message.info('Successfully registered, login to continue.');
				navigate('/', { replace: true });
			})
			.catch((error) => {
				message.error(error.response.data.msg || error.message);
				console.log(error);
			});
	};
	// LOCAL FUNCTIONALITIES
	const handleUserType = (role) => {
		setUserType(role);
	};

	const handleUser = (e) => {
		const name = e.target?.name;
		const value = e.target?.value;
		setUser({ ...user, [name]: value });
	};

	const handleVehicle = (e) => {
		const name = e?.target?.name;
		const value = e?.target?.value;
		setVehicle({ ...vehicle, [name]: value });
	};

	return {
		userType,
		user,
		vehicle,
		vehicleType,
		setVehicleType,
		profilePic,
		setProfilePic,
		nidPic,
		setNidPic,
		licensePic,
		setLicensePic,
		handleUserType,
		handleUser,
		handleVehicle,
		handleRegisterUser,
	};
};

export default useRegister;
