import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "../models/admin.js";

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

// Add other admin-specific routes here

export { adminRouter };
  