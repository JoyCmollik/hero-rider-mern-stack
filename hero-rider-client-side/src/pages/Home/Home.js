import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Login from '../../components/Auth/Login';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import carImage from '../../images/cardrive.png';
import bikeImage from '../../images/bikedrive.png';

const Home = () => {
    const { user } = useAuth();
    
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
				<div className='col-span-4 bg-white rounded-3xl overflow-hidden'>
					{/* sign-in */}
					{!user?.name && (
						<>
							<div className='text-brand1 p-4 text-center'>
								<h4 className='font-lato uppercase font-bold text-xl tracking-wider'>
									Sign In
								</h4>
							</div>
							<div className='bg-white p-4 text-dark'>
								<Login />
							</div>
						</>
					)}
					{/* learner payment */}
					{user && user?.role === 'learner' && (
						<>
							<div className='text-brand1 p-4 text-center'>
								<h4 className='font-lato uppercase font-bold text-xl tracking-wider'>
									Find Our packages
								</h4>
							</div>
							<div className='p-4 text-dark'>
								{/* form input */}
								<div className='w-full grid grid-cols-2 gap-2'>
									<div className='bg-cyan-500'>
										<img src={carImage} alt="cardrive" />
									</div>
									<div className='bg-blue-700'>
										<img src={bikeImage} alt="bikedrive" />
									</div>
								</div>
								<button
									className='block w-full p-2 rounded-xl bg-brand1 text-white font-bold'
									type='submit'
								>
									Click to purchase one of these.
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
