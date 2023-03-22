import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
     const { register, handleSubmit } = useForm();
		const onSubmit = (data) => console.log(data);
  return (
		<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
			{/* form input */}
			<div className='w-full flex flex-col'>
				<label className='label font-medium'>Email</label>
				<input
					className='p-1 border-b focus-within:border-b-brand1 outline-none'
					type='email'
					{...register('firstName')}
				/>
			</div>
			{/* form input */}
			<div className='w-full flex flex-col'>
				<label className='label font-medium'>Password</label>
				<input
					className='p-1 border-b focus-within:border-b-brand1 outline-none'
					type='password'
					{...register('firstName')}
				/>
			</div>
			<button
				className='block w-full p-2 rounded-xl bg-brand1 text-white font-bold'
				type='submit'
			>
				Let's go!
			</button>
		</form>
  );
}

export default Login