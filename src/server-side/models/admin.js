import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  isAdmin: { type: String, default: 1 }, // Add this field
  adminCode: { type: String, required: true },
  // ... other fields ...
});

const Admin = mongoose.model('Admin', adminSchema);

export { Admin };