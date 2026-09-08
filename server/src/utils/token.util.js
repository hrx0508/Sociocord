import jwt from "jsonwebtoken";

export const generateToken = (id, time) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn: time
    })
}

