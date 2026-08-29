const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { firebaseUid, name, email, photoURL } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create new user
    const newUser = await User.create({
      firebaseUid,
      name,
      email,
      photoURL,
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Create user error:", error.message);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

module.exports = {
  createUser,
};