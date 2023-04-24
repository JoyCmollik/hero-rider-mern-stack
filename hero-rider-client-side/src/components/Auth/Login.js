import { Spin } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Login = () => {
	const { register, handleSubmit } = useForm();
	const { handleLogin, loading } = useAuth();

	const onSubmit = (data) => {
		handleLogin(data);
	};

	return (
		<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
			{/* form input */}
			<div className='w-full flex flex-col'>
				<label className='label font-medium'>Email</label>
				<input
					className='p-1 border-b focus-within:border-b-brand1 outline-none'
					type='email'
					{...register('email')}
				/>
			</div>
			{/* form input */}
			<div className='w-full flex flex-col'>
				<label className='label font-medium'>Password</label>
				<input
					className='p-1 border-b focus-within:border-b-brand1 outline-none'
					type='password'
					{...register('password')}
				/>
			</div>
			<button
				className='block w-full p-2 rounded-xl bg-brand1 text-white font-bold'
				type='submit'
				disabled={loading}
			>
				{loading ? 'Hold on....' : "Let's go!"}
			</button>
		</form>
	);
};

export default Login;
