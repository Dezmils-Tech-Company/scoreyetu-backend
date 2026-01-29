import User from "../models/User.js";

// Create or update user
export const upsertUser = async (req, res) => {
  try {
    const { name, email, image } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const now = new Date();
    let user = await User.findOne({ email });

    if (user) {
      user.lastLoggedIn = now;
      await user.save();
      return res.status(200).json({ message: "User updated", user });
    }

    user = new User({ name, email, image, role: "user", createdAt: now, lastLoggedIn: now });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role image createdAt");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
