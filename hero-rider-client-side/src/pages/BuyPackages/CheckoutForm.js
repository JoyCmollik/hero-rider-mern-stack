import {
	useStripe,
	useElements,
	PaymentElement,
} from '@stripe/react-stripe-js';
import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
    const navigate = useNavigate();
    const [loading ,setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
        setLoading(true);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		 const result = await stripe.confirmPayment({
				//`Elements` instance that was used to create the Payment Element
				elements,
				confirmParams: {
					return_url:
						'https://hero-rider-4xa4.onrender.com/payment-success/',
				},
			});

		if (result.error) {
			console.log(result.error.message);
			message.error(result.error.message);
            setLoading(false);
		} else {
            navigate('/');
			message.success('Payment Done!');
              setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button
				disabled={!stripe}
				className='block w-full bg-brand1 mt-4 py-2 rounded-lg'
			>
				Pay
			</button>
		</form>
	);
};

export default CheckoutForm;
