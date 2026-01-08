import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


export const auth =(req , res , next)=>{
    try {
        const authHeader = req.headers.authorization;

         // Check if the Authorization header is present and well-formed
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                "success": false,
                "error": "Unauthorized, token missing or invalid"
            });
        }

        const token = authHeader.split(' ')[1];

         // Verify token exists after splitting
        if (!token) {
            return res.status(401).json({
                "success": false,
                "error": "Unauthorized, token missing or invalid"
            });
        }

         // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        // Handle specific JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token, authorization denied.'
            });
        } else if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired, authorization denied.'
            });
        } else {
            return res.status(500).json({
                message: 'Server error during authentication.'
            });
        }
    }
}