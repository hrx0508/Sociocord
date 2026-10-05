import channelModel from "../models/channel.model.js"
import roleModel from "../models/role.model.js"
import serverModel from "../models/server.model.js"
import serverMemberModel from "../models/serverMember.model.js"
import { createServerMember } from "../services/serverMember.service.js"
import sendFiles from "../services/storage.service.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { generateInviteCode } from "../utils/inviteCode.js"

export const createServer = async (req, res) => {
    try {

        const { name, description, isPublic } = req.body

        const icon = req.files?.icon
        let uploadIcon = null;
        if (icon) {
            uploadIcon = await sendFiles(icon[0].buffer, icon[0].originalname)
        }

        const banner = req.files?.banner
        const uploadBanner = null
        if (banner) {
            uploadBanner = await sendFiles(banner[0].buffer, banner[0].originalname)
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
            name: "member",
            server: server._id,
            permissions: [],
            positions: 10
        })

        const defaultChannels = await channelModel.create({
            name: "#general-chat",
            server: server._id,
            position: 1
        }, {
            name: "announcement",
            server: server._id,
            postion: 2,
            type: "voice"
        })

        const serverMember = await createServerMember(req.user.id, server._id, [ownerRole._id])


        return res.status(201).json(
            new ApiResponse(201, server, "Server created successfully")
        )


    } catch (error) {
        next(error)
    }
}

export const joinServer = async (req, res, next) => {
    try {

        //We are joining by inviteCode so get it
        const { inviteCode } = req.params

        //Check if that iC belong to any server
        const server = await serverModel.findOne({ inviteCode })

        if (!server) {
            throw new ApiError(404, "Invalid Invite Code")
        }

        //finds the currently logged-in user in MongoDB using their ID and stores the user data in user
        const user = await userModel.findById(req.user.id)

        if (!user) throw new ApiError(404, "User not found")

        // Check if this server is already inside the user's server list.
        const alreadyExists = await serverMemberModel.exists({ user: req.user._id, server: server._id })

        if (alreadyExists) throw new ApiError(400, "You are already a member of this server")

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

export const getAllServer = async (req, res, next) => {
    try {

        const memberships = await serverMemberModel.find({ user: req.user._id }).select("server")
        const servers = await serverModel.find({ _id: { $in: memberships.map((member) => member.server) } })

        return res.status(200).json(
            new ApiResponse(200, servers, "Servers fetched successfully")
        )

    } catch (error) {
        next(error)
    }
}

export const getSingleServer = async (req, res) => {
    try {
        const server = await serverModel.findById(req.params.serverId)
        if (!server) throw new ApiError(404, "Server not found")
        const member = await serverMemberModel.exists({ server: server._id, user: req.user._id })
        if (!member) throw new ApiError(403, "You are not a member of this server")
        return res.status(200).json(new ApiResponse(200, server, "Server fetched successfully"))
    } catch (error) {
        next(error)
    }
}

export const updateServer = async (req, res, next) => {
    try {
        const server = await serverModel.findById(req.params.serverId)
        if (!server) throw new ApiError(404, "Server not found")
        if (server.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Only server owner can update this server")
        const updated = await serverModel.findByIdAndUpdate(server._id, req.body, { new: true, runValidators: true })
        return res.status(200).json(new ApiResponse(200, updated, "Server updated successfully"))
    } catch (error) {
        next(error)
    }
}

export const deleteServer = async (req, res) => {
    try {
        const server = await serverModel.findById(req.params.serverId)
        if (!server) throw new ApiError(404, "Server not found")
        if (server.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Only server owner can delete this server")
        await Promise.all([
            serverModel.findByIdAndDelete(server_.id),
            serverMemberModel.deleteMany({ server: server._id }),
            channelModel.deleteMany({ server: server._id }),
            roleModel.deleteMany({ server: server._id }),
        ])
        return res.status(200).json(new ApiResponse(200, null, "Server deleted successfully"))
    } catch (error) {
        next(error)
    }
}

export  const createInvite = async(req, res, next) => {
    try {
        const server = await serverModel.findById(req.params.serverId)
        if(!server) throw new ApiError(404, "Server not found")
        if(!(await serverMemberModel.exists({ server: serverMemberModel._id, user: req.user._id})))
            return res.status(200).json( new ApiResponse(200, {inviteCode: server.inviteCode}))
    } catch (error) {
        next(error)
    }
}

export const leaveServer = async(req, res, next) => {
    try {
        const server = await serverModel.findById(req.params.serverId)
        if(!server) throw new ApiError(404, "Server not found")
            if(server.owner.toString() === req.user._id.toString()) throw new ApiError(400, "Server owner cannot leave the server")
            const member = await serverMemberModel.findOneAndDelete({ server: server._id, user: req.user._id})
            if(!member) throw new ApiError(404, "You are not a member of this server")
            return res.status(200).json(new ApiResponse(200, null, "Left server successfully"))
    } catch (error) {
        next (error);
    }
}