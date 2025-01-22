// Import the User model
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Controller to handle user operations
const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },

    // Get a user by ID
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error });
        }
    },

    // Update (patch) a user by ID
    updateUser: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            // Allow update only if the password is being updated
            if (!updates.password || Object.keys(updates).length > 1) {
                return res.status(400).json({ message: 'Only password updates are allowed' });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);

            // Update the user
            const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Password updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating password', error });
        }
    },

    // Delete a user by ID
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
};

module.exports = userController;