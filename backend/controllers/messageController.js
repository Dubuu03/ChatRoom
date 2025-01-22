const Message = require('../models/Message');

// Fetch all messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate('user', 'username email');
        console.log(`Fetched ${messages.length} messages`);

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

// Fetch a single message by ID
const getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).populate('user', 'username email');
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching message' });
    }
};

// Fetch messages by user
const getMessagesByUser = async (req, res) => {
    try {
        const messages = await Message.find({ user: req.params.userId }).populate('user', 'username email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user messages' });
    }
};

// Create a new message
const createMessage = async (req, res) => {
    const { text, identifier, timestamp, user } = req.body;

    try {
        const Message = require('../models/Message');

        // Get all messages
        const getMessages = async (req, res) => {
            try {
                const messages = await Message.find()
                    .populate('user', 'username email')
                    .sort({ createdAt: 1 });
                res.json(messages);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        };

        // Create message
        const createMessage = async (req, res) => {
            try {
                const { text } = req.body;
                const message = new Message({
                    text,
                    user: req.user._id
                });

                const savedMessage = await message.save();
                const populatedMessage = await Message.findById(savedMessage._id)
                    .populate('user', 'username email');

                res.status(201).json(populatedMessage);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        };

        module.exports = { getMessages, createMessage };
        const newMessage = new Message({ text, identifier, timestamp, user });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: 'Error creating message' });
    }
};

// Update a message
const updateMessage = async (req, res) => {
    const { text, identifier, timestamp } = req.body;

    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            { text, identifier, timestamp },
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ error: 'Error updating message' });
    }
};

// Delete a message
const deleteMessage = async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting message' });
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    getMessagesByUser,
    createMessage,
    updateMessage,
    deleteMessage,
};
