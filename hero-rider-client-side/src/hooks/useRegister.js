import { useState } from "react";

const initialUser = {
	name: '',
	email: '',
	age: '',
	phone: '',
	city: '',
	area: '',
	role: '',
	avatarURL: '',
	nidURL: '',
	licenseURL: '',
	password: '',
	confirmPassword: '',
	vehicleType: '',
	vehicle: '',
};

const initialVehicle = {
	name: '',
	model: '',
	namePalate: '',
};

const useRegister = () => {
	const [userType, setUserType] = useState(null);
	const [user, setUser] = useState({ ...initialUser });
	const [vehicle, setVehicle] = useState({ ...initialVehicle });
	const [profilePic, setProfilePic] = useState([]);
	const [nidPic, setNidPic] = useState([]);
	const [licensePic, setLicensePic] = useState([]);

    // API REQUESTS
    const handleRegisterUser = () => {
        if(userType === 'rider') {
            user.vehicle = {...vehicle};
            user.role = userType;
        }
    }
    // LOCAL FUNCTIONALITIES
    const handleUserType = (role) => {
		setUserType(role);
	};

	const handleUser = (e, cusName, cusValue) => {
		const name = e?.target?.name || cusName;
		const value = e?.target?.value || cusValue;
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
