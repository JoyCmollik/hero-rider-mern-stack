import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useAuthentication = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

    console.log(user);

	const handleLogin = (data) => {
		console.log(data);
		setLoading(true);
		axios
			.post('/auth/login', data)
			.then((response) => {
				setUser(response.data.user);
				console.log(response.data.user);
			})
			.catch((error) => {
				console.log(error);
				message.error(
					error?.response?.data?.msg || error?.message,
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleLogout = (navigate) => {
		setLoading(true);
		axios
			.delete('/auth/logout')
			.then((response) => {
				setUser(() => null);
				console.log(response.msg);
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
				message.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		if (!user) {
			axios
				.get('/users/showMe')
				.then((res) => {
					setUser(res.data.user);
					console.log('retrieved user');
				})
				.catch((err) => {
					setUser(null);
					console.log('failed user');
				})
				.finally(() => {
					setLoading(false);
				});
		}

		return () => {};
	}, [user]);

	return {
		user,
		setUser,
		handleLogin,
		handleLogout,
		loading,
	};
};

export default useAuthentication;
