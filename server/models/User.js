const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide valid email',
		},
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
	},
	passwordToken: String,
	passwordTokenExpirationDate: Date,
	role: {
		type: String,
		enum: ['admin', 'rider', 'learner'],
		default: 'learner',
	},
	status: {
		type: String,
		enum: ['active', 'blocked'],
		default: 'active',
	},
	age: {
		type: Number,
		required: [true, 'Please provide your age'],
	},
	phone: {
		type: String,
		required: [true, 'Please provide your phone'],
	},
	city: {
		type: String,
		required: [true, 'Please provide your city'],
	},
	area: {
		type: String,
		required: [true, 'Please provide your area'],
	},
	avatarURL: {
		type: String,
		required: [true, 'Please provide your profile picture'],
	},
	nidURL: {
		type: String,
		required: [true, 'Please provide your nid picture'],
	},
	licenseURL: String,
	vehicleType: {
		type: String,
		enum: ['car', 'bike'],
		default: 'car',
	},
	vehicle: {
		name: String,
		model: String,
		namaPalate: String,
	},
});

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
