import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//register
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    // create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    // send response
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

//register
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "Auth error contact admin" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
