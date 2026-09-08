import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import redis from '../config/redis.config';
import UserModel from '../models/user.model';


export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;

        if (!token) throw new ApiError(400, "Token is required")

        const isTokenBlacklisted = await redis.get(`bearer:accessToken:${accessToken}`)

        if (isTokenBlacklisted) return res.status(401).json({
            success: false,
            message: "Token is invalid"
        })

        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decode)
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })

            let user = await UserModel.findById(decode.id).select("-password")
             
            req.user = user;
            next();
    } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation Error"
            })
    }
}
