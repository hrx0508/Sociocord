import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken'
import redis from '../config/redis.config';
import UserModel from '../models/user.model';


export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.accessToken;

        if (!token) throw new ApiError(401, "AccessToken is required")

        const isTokenBlacklisted = await redis.get(`Bearer:accessToken:${token}`)

        if (isTokenBlacklisted) throw new ApiError(401, "Token is invalid");

        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        let user = await UserModel.findById(decode.id).select("-password")

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
}
