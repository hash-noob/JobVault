import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";


const adminRouter = express.Router();

// Admin Registration API
adminRouter.post("/register", async (req, res) => {
  const { name, email, password, adminCode } = req.body;

  if (!name || !email || !password || !adminCode) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (adminCode !== "ADMIN_SECRET") {
    return res.status(400).json({ message: "Invalid admin code" });
  }

  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashpassword,
      adminCode
    });

    await newAdmin.save();
    return res.json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });

  if (!user) {
    console.log("Invalid User");
    return res.json("Invalid User");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log("Password Incorrect");
    return res.json("Password Incorrect");
  }
  const token = jwt.sign(
    { _id: user._id, username: user.username, isAdmin: true },
    process.env.KEY,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true, maxAge: 300000 });

  if (user.isAdmin === "1") {
    console.log("User is admin");
    return res.json("Admin");
  }
});

export { adminRouter };
  