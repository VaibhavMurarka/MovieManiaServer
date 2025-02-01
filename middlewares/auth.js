import jwt from "jsonwebtoken";
import User from '../model/User.js';
//see
//import dotenv from 'dotenv';
//dotenv.config();
export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Login First",
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};
