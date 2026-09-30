import channelModel from "../models/channel.model.js"
import roleModel from "../models/role.model.js"
import serverModel from "../models/server.model.js"
import { createServerMember } from "../services/serverMember.service.js"
import sendFiles from "../services/storage.service.js"
import { generateInviteCode } from "../utils/inviteCode.js"

export const createServer = async (req, res) => {
    try {
        
        const {name, description, isPublic} = req.body

        if(!name){
            throw new ApiError(400, "Name is required")
        }

        const icon = req.files?.icon
        let uploadIcon = null;
        if(icon){
            let uploadIcon = await sendFiles(icon[0].buffer,icon[0].originalname)
        }

        const banner = req.files?.banner
        const uploadBanner = null
        if(banner){
            let uploadBanner = await sendFiles(banner[0].buffer, banner[0].originalname)
        }


        const inviteCode = generateInviteCode()

        const server = await serverModel.create({
            name,
            description,
            owner: req.user.id,
            banner: uploadBanner?.url || "",
            icon: uploadIcon?.url || "",
            isPublic,
            inviteCode
        })

        const ownerRole = await roleModel.create({
            name: "Owner",
            server: server._id,
            permissions: [
                "MANAGE_SERVER",
                "MANAGE_CHANNELS",
                "MANAGE_MEMBERS",
                "MANAGE_MESSAGES"
            ],
            postion: 100
        })


        const memberRole = await roleModel.create({
            name:"member",
            server: server._id,
            permissions:[],
            positions: 10
        })

        const defaultChannels = await channelModel.create({
            name: "#general-chat",
            server: server._id,
            position: 10
        },{
            name: "announcement",
            server: server._id,
            postion:2,
            type: "voice"
        })

        const serverMember = await createServerMember(req.user.id, server._id,[ownerRole._id])


        return res.status(201).json(
            new ApiResponse(201, server, "Server created successfully")
        )


    } catch (error) {
     next(error)
    }
}

export const getAllServer = async(req, res) => {
    try {
        
        const servers = await serverModel.find()

        if(!servers){
            throw new ApiError(404, "Servers not found")
        }

        return res.status(200).json({
            success: true,
            message: "Servers fetched successfully",
            data: servers
        })

    } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getSingleServer = async(req, res) => {
    try {
        const {id} = req.params

        if(!id) {
            throw new ApiError(400, "Server ID is required")
        }

        const server = await serverModel.findById(id)

        if(!server){
            throw new ApiError(404, "Server not found")
        }

        return res.status()
    } catch (error) {
        
    }
}

export const deleteServer = async(req, res) => {

}

export const joinServer = async(req, res, next) => {
    try {
        
        //We are joining by inviteCode so get it
        const {inviteCode} = req.params

        //Check if that iC belong to any server
        const server = await serverModel.findOne({inviteCode})

        if(!server){
            throw new ApiError(404, "Invalid Invite Code")
        }

        //finds the currently logged-in user in MongoDB using their ID and stores the user data in user
        const user = await userModel.findById(req.user.id)

        if(!user) throw new ApiError(404, "User not found")

        // Check if this server is already inside the user's server list.
        //.some --> Does at least one element satisfy this condition? It returns true or false.
        const alreadyExists = (user.server || []).some((serverId) => 
         serverId.toString() === server._id.toString()
        )

        if(alreadyExists) throw new ApiError(400, "You are already a member of this server")

            const memberRole = roleModel.findOne({
                   server: server._id,
                   name: "member"
            })

            await createServerMember(req.user.id, server._id, [memberRole._id])

            return res.status(200).json(
                new ApiResponse(200, server, "Server joined successfully")
            )

    } catch (error) {
        next(error)
    }
}
