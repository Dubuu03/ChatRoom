const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyUserToken } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);  // Ensure the POST route exists for login
router.post('/verify-token', verifyUserToken);

module.exports = router;
