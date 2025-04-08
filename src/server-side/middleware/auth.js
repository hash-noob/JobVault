import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ status: false, message: "Access denied. No token provided." });
  }
  
  try {
    const verified = jwt.verify(token, process.env.KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ status: false, message: "Invalid token" });
  }
};