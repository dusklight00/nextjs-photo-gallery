import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!uri || !jwtSecret) {
  throw new Error(
    "Please define the MONGODB_URI and JWT_SECRET environment variables inside .env.local"
  );
}

// Connect to MongoDB using Mongoose
mongoose.connect(uri);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hi");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ username: user.username }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
