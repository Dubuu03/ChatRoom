const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import the User model
const { generateToken, hashToken, verifyToken } = require('../utils/tokenUtils'); // Import token utility functions

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Sanitize the email and username
        const sanitizedUsername = username.trim().toLowerCase();
        const sanitizedEmail = email.trim().toLowerCase();

        // Check if the user already exists by email or username
        const userExists = await User.findOne({ $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login user and generate token
const loginUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        // Sanitize the identifier (email or username)
        const sanitizedIdentifier = identifier.trim().toLowerCase();

        // Find the user by username or email
        const user = await User.findOne({ $or: [{ email: sanitizedIdentifier }, { username: sanitizedIdentifier }] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or email' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password. Try again with correct password.' });
        }

        // Generate and hash token
        const token = generateToken();
        const hashedToken = await hashToken(token);

        // Store the token in the database
        user.token = hashedToken;
        await user.save();

        // Send token to client
        res.json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Verify token
const verifyUserToken = async (req, res) => {
    const { userId, token } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        const isValid = await verifyToken(user.token, token);
        if (isValid) {
            res.json({ message: 'Token is valid' });
        } else {
            res.status(401).json({ message: 'Invalid or expired token.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser, verifyUserToken };
