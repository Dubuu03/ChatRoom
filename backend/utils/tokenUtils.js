const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); // Ensure environment variables are loaded

// Generate a random token
const generateToken = () => {
    const uuidToken = uuidv4();
    const secretKey = process.env.JWT_SECRET;
    return `${uuidToken}${secretKey}`; // Corrected string concatenation
};

// Hash the combined token (UUID + secret) using bcrypt
const hashToken = async (token) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
};

// Verify the token by comparing the stored hashed version with the provided token
const verifyToken = async (storedToken, token) => {
    return await bcrypt.compare(token, storedToken);
};

module.exports = { generateToken, hashToken, verifyToken };
