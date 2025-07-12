import Message from '../models/Message.js';
import Notification from '../models/Notification.js';

export const sendMessage = async (req, res) => {
  try {
    const { roomId, content, mentions = [] } = req.body;

    const message = await Message.create({
      roomId,
      content,
      sender: req.user._id,
      mentions
    });

    // Optional: emit via Socket.IO
    // io.to(roomId).emit("newMessage", message);

    // Notify mentioned users
    for (const userId of mentions) {
      await Notification.create({
        user: userId,
        type: 'mention',
        message: `${req.user.username} mentioned you in a message.`,
        link: `/rooms/${roomId}`
      });
    }

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getMessagesForRoom = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
