import dotenv from "dotenv"
dotenv.config()
import cookieParser from 'cookie-parser';
import express from 'express';
import passport from "passport";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import authRoutes from "../routes/auth.routes.js"
import serverRoutes from "../routes/server.routes.js"
import { errorMiddleware } from "../middlewares/error.middleware.js";

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},(_,__,profile,done) => {
    return done(null, profile)
}))


app.use('/api/auth', authRoutes)
app.use('/api/server', serverRoutes)

app.use(errorMiddleware)

export default app;