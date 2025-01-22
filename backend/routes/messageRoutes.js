const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().populate('user', 'username email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Fetch message by ID
router.get('/messages/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).populate('user', 'username email');
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching message' });
    }
});

// Fetch messages by user
router.get('/messages/user/:userId', async (req, res) => {
    try {
        const messages = await Message.find({ user: req.params.userId }).populate('user', 'username email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user messages' });
    }
});

// Create a new message
router.post('/messages', async (req, res) => {
    const { text, identifier, timestamp, user } = req.body;

    try {
        const newMessage = new Message({ text, identifier, timestamp, user });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: 'Error creating message' });
    }
});

// Update a message
router.put('/messages/:id', async (req, res) => {
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
});

// Delete a message
router.delete('/messages/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting message' });
    }
});

module.exports = router;
