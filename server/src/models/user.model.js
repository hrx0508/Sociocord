import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },
    fullname: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        select: false
    },
    dob: {
        type: Date
    },
    mobile_no: {
        type: Number,
        unique: true,
        sparse: true
    },
    profile_pic: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    server: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "servers"
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
    timestamps: true
})


userSchema.pre("save", function () {
    if (!this.password || !this.isModified("password")) return;

    this.password = bcrypt.hashSync(this.password, 10)
})


userSchema.methods.comparePass = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const UserModel = mongoose.model("users", userSchema)

export default UserModel;