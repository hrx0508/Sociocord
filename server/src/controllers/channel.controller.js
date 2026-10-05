import serverModel from "../models/server.model";
import serverMemberModel from "../models/serverMember.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";

const requireMember = async (serverId, userId) => {
    const member = await serverMemberModel.exists({ server: serverId, user: userId })
    if (!member) throw new ApiError(403, "You are not a member of this server");
}

export const createChannel = async (req, res, next) => {
    try {

        const { serverId } = req.params;
        const { name, type, position, isPrivate } = req.body;

        const server = await serverModel.findById(serverId);

        if (!server) {
            throw new ApiError(404, "Server not found")
        }

        if (server.owner.toString() !== req.user._id.toString()) {
            throw new ApiError(403, "Only server owner can create channels")
        }

        const channel = await channelModel.create({
            name,
            type,
            server: serverId,
            position,
            isPrivate
        })

        return res.status(201).json(
            new ApiResponse(201, channel, "Channel created successfully")
        )

    } catch (error) {
        next(error);
    }
}

export const getServerChannels = async (req, res, next) => {
    try {
        await requireMember(req.params.serverId, req.user._id);
        const channels = await channelModel.find({ server: req.params.serverId }).sort({ position: 1, createdAt: 1 });
        return res.status(200).json(new ApiResponse(200, channels, "Channels fetched successfully"))
    } catch (error) {
        next(error)
    }
}

export const getChannelById = async (req, res, next) => {
    try {
        const channel = await channelModel.findOne({ _id: req.params.channelId, server: req.params.serverId });
        if (!channel) throw new ApiError(404, "Channel not found");
        await requireMember(channel.server, req.user._id);
        return res.status(200).json(new ApiResponse(200, channel, "Channel fetched successfully"));
    } catch (error) {
        next(error);
    }
}

export const updateChannel = async (req, res, next) => {
    try {
        const server = await serverModel.findById(req.params.serverId);
        if (!server) throw new ApiError(404, "Server not found");
        if (server.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Only server owner can update channels")
        const channel = await channelModel.findOneAndUpdate({ _id: req.params.channelId, server: req.params.serverId }, req.body, { new: true, runValidators: true });
        if (!channel) throw new ApiError(404, "Channel not found");
        return res.status(200).json(new ApiResponse(200, channel, "Channel updated successfully"));
    } catch (error) {
        next(error);
    }
}

export const deleteChannel = async(req, res, next) => {
     try {
        const server = await serverModel.findById(req.params.serverId);
        if (!server) throw new ApiError(404, "Server not found");
        if (server.owner.toString() !== req.user._id.toString()) throw new ApiError(403, "Only server owner can delete channels");
        const channel = await channelModel.findOneAndDelete({ _id: req.params.channelId, server: req.params.serverId });
        if (!channel) throw new ApiError(404, "Channel not found");
        return res.status(200).json(new ApiResponse(200, null, "Channel deleted successfully"));
    } catch (error) { next(error); }
}