const express = require('express');
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require('../middleware/authentication');
const {
	getAllUsers,
	getSingleUser,
	blockUser,
	showCurrentUser,
	updateUser,
	updateUserPassword,
} = require('../controllers/userController');

router
	.route('/')
	.get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router
	.route('/block-user')
	.patch(authenticateUser, authorizePermissions('admin'), blockUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
