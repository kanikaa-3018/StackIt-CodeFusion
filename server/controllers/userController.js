import User from "../models/User.js";
import Session from "../models/Session.js";
import bcrypt from "bcryptjs";
import { verifyToken, createToken } from "../utils/generateToken.js";
import ms from "ms";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password, bio, avatar, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      bio: bio || "",
      avatar: avatar || "",
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = createToken({ userId: user._id }, process.env.ACCESS_TOKEN_DURATION);
    const refreshToken = createToken({ userId: user._id }, process.env.REFRESH_TOKEN_DURATION);

    await Session.create({
      userId: user._id,
      accessToken,
      refreshToken,
      expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_DURATION)),
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: ms(process.env.REFRESH_TOKEN_DURATION),
    });

    res.status(200).json({
      jwt_token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshAcessToken = async (req, res) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const payload = verifyToken(token);

    const session = await Session.findOne({ refreshToken: token, userId: payload.userId });
    if (!session) {
      return res.status(403).json({ message: "Session not found" });
    }

    if (new Date() > new Date(session.expiresAt)) {
      return res.status(403).json({ message: "Refresh token expired" });
    }

    const newAccessToken = createToken({ userId: payload.userId }, process.env.ACCESS_TOKEN_DURATION);

    session.accessToken = newAccessToken;
    session.expiresAt = new Date(Date.now() + ms(process.env.ACCESS_TOKEN_DURATION));
    await session.save();

    res.status(200).json({ jwt_token: newAccessToken });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("questions")
      .populate("answers");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "User not found" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    user.avatar = req.body.avatar || user.avatar;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
