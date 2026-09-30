import mongoose from "mongoose"

const serverSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String
   },
   banner: {
      type: String
   },
   icon: {
      type: String
   },
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
   },
   isPublic: {
      type: Boolean
   },
   inviteCode: {
      type: String,
      required: true
   },
   owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
   }
}, {
   timestamps: true
})

const serverModel = mongoose.model("servers", serverSchema)
export default serverModel;