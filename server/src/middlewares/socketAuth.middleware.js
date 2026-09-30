import jwt from "jsonwebtoken"
import redis from "../config/redis.config.js"
import userModel from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie

        if (!cookies) {
            throw new ApiError(401, "Authentication is required")
        }

        const accessToken = cookies.split(";").map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith("accessToken="))?.split("=").slice(1).join("=")

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized")
        }

        const isBlacklisted = await redis.get(`Bearer:accessToken:${accessToken}`)

        if (isBlacklisted) {
            throw new ApiError(403, "Token is invalid")
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        console.log(decoded)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            throw new ApiError(404, "User not found")
        }

        socket.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}