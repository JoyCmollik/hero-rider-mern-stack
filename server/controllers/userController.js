const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
	createTokenUser,
	attachCookiesToResponse,
	checkPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
	let filters = { role: ['rider', 'learner'] };
	const queries = {};

	// pagination
	if (req.query.page) {
		const { page = 1, limit = 2 } = req.query;
		const skip = (Number(page) - 1) * Number(limit); // page 5 --> 5 - 1 * 10 = skip first 4 page data
		queries.skip = skip;
		queries.limit = Number(limit);
	}

	// search
	if (req.query.search) {
		filters.$or = [
			{ email: { $regex: req.query.search, $options: 'i' } },
			{ phone: { $regex: req.query.search, $options: 'i' } },
			{ name: { $regex: req.query.search, $options: 'i' } },
		];
	}

	// age
	if (req.query.minAge && req.query.maxAge) {
		filters.age = {
			$gte: Number(req.query.minAge),
			$lte: Number(req.query.maxAge),
		};
	}

	const users = await User.find(filters)
		.skip(queries.skip)
		.limit(queries.limit)
		.select('-password');
	const total = await User.countDocuments(filters);

	res.status(StatusCodes.OK).json({ users, total });
};

const getSingleUser = async (req, res) => {
	const user = await User.findOne({ _id: req.params.id }).select('-password');
	if (!user) {
		throw new CustomError.NotFoundError(
			`No user with id : ${req.params.id}`
		);
	}
	checkPermissions(req.user, user._id);
	res.status(StatusCodes.OK).json({ user });
};

const blockUser = async (req, res) => {
  const {userIds} = req.body;
  console.log(JSON.stringify({ _id: { $in: userIds } }));
  const result = await User.updateMany({_id: {$in: userIds}}, {status: 'blocked'});

  console.log(result)

  res.status(StatusCodes.OK).json({ users: result.modifiedCount });
}

const showCurrentUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ user: req.user });
};
// update user with user.save()
const updateUser = async (req, res) => {
	const { email, name } = req.body;
	if (!email || !name) {
		throw new CustomError.BadRequestError('Please provide all values');
	}
	const user = await User.findOne({ _id: req.user.userId });

	user.email = email;
	user.name = name;

	await user.save();

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError('Please provide both values');
	}
	const user = await User.findOne({ _id: req.user.userId });

	const isPasswordCorrect = await user.comparePassword(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid Credentials');
	}
	user.password = newPassword;

	await user.save();
	res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
	getAllUsers,
	getSingleUser,
  blockUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
};
