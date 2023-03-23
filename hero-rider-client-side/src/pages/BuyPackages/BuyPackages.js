import React, { useState } from 'react';
import carImage from '../../images/cardrive.png';
import bikeImage from '../../images/bikedrive.png';
import Navbar from '../../components/layout/Navbar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { message } from 'antd';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
	'pk_test_51LfOApI47CYKporZkh2MdMmas1xnzFYYP3sMKttvbGVzdP5469ER6L9qw9PhxWbnM8DVIVsX6Dox332DXoGS7QNl00tvnIxD0r'
);

const BuyPackages = () => {
	const [currPackage, setCurrPackage] = useState();
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState({
		clientSecret: null,
	});

    const handlePackage = (type, total) => {
        setCurrPackage({type, total});
    }

	const handleCreatePaymentIntent = () => {
        setLoading(true);
        axios
			.post('/users/create-payment-intent', {
				total_amount: currPackage.total,
			})
			.then((response) => {
				message.info(response.data.clientSecret);
				setOptions({ clientSecret: response.data.clientSecret });
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
    }

	return (
		<div className='min-h-screen bg-dark p-4 space-y-4 flex flex-col'>
			<Navbar></Navbar>
			<div className='flex-grow h-full bg-white rounded-lg container mx-auto grid grid-cols-12 gap-4 p-4'>
				{/* package information */}
				<div className='h-full col-span-7 bg-brand1 rounded-lg'>
					<div className='w-full h-full grid grid-cols-2 gap-4 p-4'>
						<div className='relative bg-white flex flex-col justify-center items-center p-4 border rounded-lg overflow-hidden space-y-4'>
							<img
								className='w-[250px] h-[250px] object-cover'
								src={carImage}
								alt='cardrive'
							/>
							<h4 className='font-lato uppercase font-bold text-base tracking-wider'>
								learn to drive car.
							</h4>
							<button
								onClick={() => handlePackage('car', 200)}
								className='px-4 py-2 bg-dark text-white rounded-lg disabled:opacity-10'
								disabled={loading}
							>
								Select This Package
							</button>
							{/* price */}
							<div className='absolute top-[0px] right-[10px] bg-brand1 rounded-lg text-white px-4 py-1 text-lg fong-bold'>
								$200
							</div>
						</div>
						<div className='relative bg-white backdrop-filter flex flex-col justify-center items-center p-4 border rounded-lg overflow-hidden space-y-4'>
							<img
								className='w-[250px] h-[250px] object-cover'
								src={bikeImage}
								alt='bikedrive'
							/>
							<h4 className='font-lato uppercase font-bold text-base tracking-wider'>
								bike riding is fun!
							</h4>
							<button
								onClick={() => handlePackage('bike', 100)}
								className='px-4 py-2 bg-dark text-white rounded-lg disabled:opacity-10'
								disabled={loading}
							>
								Select This Package
							</button>
							{/* price */}
							<div className='absolute top-[0px] right-[10px] bg-brand1 rounded-lg text-white px-4 py-1 text-lg fong-bold'>
								$100
							</div>
						</div>
					</div>
				</div>
				{/* payment gateway */}
				<div className='p-4 h-full col-span-5 bg-dark text-white rounded-lg flex justify-center items-center'>
					{options.clientSecret ? (
						<Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
						</Elements>
					) : (
						<div className='bg-white text-dark rounded-lg'>
							{currPackage?.type ? (
								<div className='p-4'>
									<h4>
										You have selected to learn{' '}
										{currPackage.type} driving.
									</h4>
									<p>
										You will have to pay $
										{currPackage.total}
									</p>
									<button
										onClick={handleCreatePaymentIntent}
										className='px-4 py-2 bg-dark text-white rounded-lg disabled:opacity-10'
										disabled={loading}
									>
										{loading
											? 'Confirming.... '
											: 'Confirm'}
									</button>
								</div>
							) : (
								<div className='p-4'>Select any package.</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BuyPackages;
