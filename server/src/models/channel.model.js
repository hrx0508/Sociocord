import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    type: {
        type: String,
        enum: ["text", "voice"],
        default: "text"
    },
    server: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servers",
        required: true
    },
    position:{
        type: Number,
        default: 0
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const channelModel = mongoose.model("channels", channelSchema)
export default channelModel;