import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Login from '../../components/Auth/Login';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='h-screen bg-dark p-4 overflow-hidden'>
			<Navbar />
			<div className='container mx-auto h-full grid grid-cols-12 gap-4 p-4 justify-center items-center'>
				<div className='col-span-8 space-y-4'>
					<h4 className='text-4xl font-semibold'>
						Start Your Riding Journey
					</h4>
					<Link className='inline-block' to='/register'>
						<button className='text-lg px-4 py-2 border rounded-lg'>
							Register Yourself
						</button>
					</Link>
				</div>
				{/* sign-in */}
				<div className='col-span-4 bg-white rounded-3xl overflow-hidden'>
					<div className='text-brand1 p-4 text-center'>
						<h4 className='font-lato uppercase font-bold text-xl tracking-wider'>
							Sign In
						</h4>
					</div>
					<div className='bg-white p-4 text-dark'>
						<Login />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
