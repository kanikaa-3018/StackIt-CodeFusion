import Room from "../models/Room.js";

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { name, description } = req.body;

    const room = await Room.create({
      name,
      description: description || "",
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

// Get all public rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isPrivate: false })
      .populate('members', 'name email')
      .populate("createdBy", "name email");

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rooms' });
  }
};

// Get a single room by ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('members', 'name email')
      .populate("createdBy", "name email");

    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch room' });
  }
};

// Join a room
export const joinRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: 'Room not found' });

    if (!room.members.includes(req.user._id)) {
      room.members.push(req.user._id);
      await room.save();
    }

    res.status(200).json({ message: 'Joined room', room });
  } catch (error) {
    res.status(500).json({ message: 'Failed to join room' });
  }
};

// Leave a room
export const leaveRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.members = room.members.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    await room.save();

    res.status(200).json({ message: 'Left room' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to leave room' });
  }
};

// Get rooms created by the user
export const getMyRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ createdBy: req.user._id })
      .populate("createdBy", "name email");

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your rooms' });
  }
};

// Search rooms by name or description
export const searchRooms = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, "i");

    const rooms = await Room.find({
      isPrivate: false,
      $or: [{ name: regex }, { description: regex }],
    });

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search rooms' });
  }
};
