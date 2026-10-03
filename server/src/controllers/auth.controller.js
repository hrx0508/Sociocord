import userModel from "../models/user.model.js"
import sendFiles from "../services/storage.service.js"
import redis from "../config/redis.config.js"
import bcrypt from "bcrypt"
import sendEmail from "../services/email.service.js"
import { generateToken } from "../utils/token.util.js"
import { generateOtp } from "../utils/otp.util.js"
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

export const registerUser = async (req, res, next) => {

    try {
        //get the data from req.body and req.file
        const { fullname, username, email, password, dob, mobile_no } = req.body
        const file = req.file

        //check if all fields are present
        if (!fullname || !username || !email) return res.status(400).json({
            success: false,
            message: "All fields are required"
        })

        let uploadImage = null;

        if (file) {
            uploadImage = await sendFiles(file.buffer, file.originalname)
        }


        //create user in database
        const user = await userModel.create({
            fullname,
            username,
            email,
            password,
            dob,
            mobile_no,
            profile_pic: uploadImage?.url || ""
        })


        //generate access and refresh token 
        const accessToken = generateToken(user._id, "15min")
        const refreshToken = generateToken(user._id, "2d")

        //set the access and refresh token in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            secure: false,
            sameSite: "strict"
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "strict"
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })
    } catch (error) {
        next(error.message)
    }
}

export const loginUser = async (req, res, next) => {
    try {

        //get the data from req.body
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            success: false,
            message: "Email and password is required",
        })

        //find the user in database
        const user = await userModel.findOne({ email }).select("password")

        if (!user) throw new ApiError(404, "User not found")

        //check if user registered with google or password is not set
        if (!user.password || user.authProvider === 'google') return res.status(400).json({
            success: false,
            message: "continue with google"
        })

        const isPasswordCorrect = user.comparePass(password)

        if (!isPasswordCorrect) throw new ApiError(401, "Invalid credential")

        //generate access and refresh token
        const accessToken = generateToken(user._id, "15min")
        const refreshToken = generateToken(user._id, "2d")

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            secure: false,
            sameSite: "strict"
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "strict"
        })

        let userData = user.toObject()

        delete userData.password
        return res.status(200).json(
            new ApiResponse(200, userData, "User login successfully")
        )
    } catch (error) {
        next(error)
    }

}

export const googleAuth = async (req, res) => {
    const { email, name, given_name, picture, sub } = req.user._json
    console.log(req.user)
    const user = await userModel.findOne({ email })

    if (user) {
        if (!user.googleId) {
            user.googleId = sub
            await user.save()
        }

        const accessToken = generateToken(user._id, "15min")
        const refreshToken = generateToken(user._id, "2d")


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 * 1000
        })

        res.redirect('http://localhost:5173/')

        return res.status(200).json({
            success: true,
            message: "user loggedin successfully",
            user
        })

    }

    const newUser = await userModel.create({
        username: given_name,
        fullname: name,
        email,
        profile_pic: picture,
        googleId: sub,
        authProvider: req.user.provider
    })



    const accessToken = generateToken(newUser._id, "15min")
    const refreshToken = generateToken(newUser._id, "2d")


    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000
    })

    res.redirect('http://localhost:5173/')
    return res.status(201).json({
        success: true,
        message: "user register successfully",
        newUser
    })

}

export const logoutUser = async (req, res) => {
    //get access and refresh token from cookies
    const { accessToken, refreshToken } = req.cookies

    //blacklist the token in redis
    if (accessToken) {
        await redis.set(`Bearer: accessToken:${accessToken}`, "true")

    }
    if (refreshToken) {
        await redis.set(`Bearer: refreshToken:${refreshToken}`, "true")

    }

    //clear the cookies
    res.clearCookie("refreshToken")
    res.clearCookie("accessToken")

    return res.status(200).json({
        success: true,
        message: "User logout successfully"
    })

}

export const forgetPassword = async (req, res) => {
    try {
        //get email from req.body
        const { email } = req.body

        if (!email) return res.status(400).json({
            success: false,
            message: "Email is required"
        })

        const user = await userModel.findOne({ email })

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })


        const otp = generateOtp()

        const hashedOtp = bcrypt.hashSync(otp, 10)

        await redis.set(`reset-password-hashedOtp-${email}`, hashedOtp, "EX", 10 * 60)

        await sendEmail(
            user.email,
            "Reset Your Sociocord Password",
            `Reset your password using this otp: ${otp}`,
            `
                <div style="font-family: Arial, sans-serif;">
                <h2>Password Reset Request</h2>

                <p>Your OTP for resetting your password is:</p>

                <h1 style="letter-spacing: 5px;">
                    ${otp}
                </h1>

                <p>This OTP will expire in <strong>10 minutes</strong>.</p>

                <p>If you did not request a password reset, please ignore this email.</p>
                </div>
            `
        )

        return res.status(200).json({
            success: true,
            message: "Email sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    if (!otp) return res.status(400).json({
        success: false,
        message: "Otp is required"
    })

    const hashedOtp = await redis.get(`reset-password-hashedOtp-${email}`)

    if (!hashedOtp) return res.status(404).json({
        success: false,
        message: "Otp is expired or not found"
    })

    const isValid = bcrypt.compareSync(otp, hashedOtp)

    if (!isValid) return res.status(403).json({
        success: false,
        message: "Invalid Otp"
    })

    await redis.del(`reset-password-hashedOtp-${email}`)

    const resetToken = generateToken(email, "15min")

    const hashedResetToken = bcrypt.hashSync(resetToken, 10)

    await redis.set(`reset-token-hashedResetToken-${email}`, hashedResetToken, "EX", 10 * 60)

    return res.status(200).json({
        success: true,
        message: "Otp verified successfully",
        resetToken
    })
}

export const resetPassword = async (req, res) => {
    const { email, resetToken, newPassword } = req.body

    if (!email || !resetToken || !newPassword) return res.status(400).json({
        success: false,
        message: "Email, resetToken and newpassword is required"
    })

    const hashedResetToken = await redis.get(`reset-token-hashedResetToken-${email}`)

    if (!hashedResetToken) return res.status(400).json({
        success: false,
        message: "Your session has expired please try again"
    })

    const user = await userModel.findOne({ email }).select("password")

    if (!user) return res.status(404).json({
        success: false,
        message: "User not found"
    })

    user.password = newPassword

    await user.save()

    await redis.del(`reset-token-hashedResetToken-${email}`)

    return res.status(200).json({
        success: true,
        message: "Password reset successfully"
    })
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const isBlacklisted = await redis.get(
        `Bearer:refreshToken:${refreshToken}`
    );

    if (isBlacklisted) {
        return res.status(401).json({
            success: false,
            message: "Refresh token has been revoked"
        })
    }

    const decoded = jwt.verify(
        refreshToken, process.env.JWT_SECRET_KEY
    );

    const user = await userModel.findById(decoded.id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const accessToken = generateToken(user._id, "15m");

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: false,
        sameSite: "strict"
    })

    return res.status(200).json({
        success: true,
        message: "Access token regenerated successfully"
    })
}