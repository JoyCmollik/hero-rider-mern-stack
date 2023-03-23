const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripeController = async (req, res) => {
	const { total_amount } = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(total_amount * 100),
		currency: 'usd',
	});

	res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
