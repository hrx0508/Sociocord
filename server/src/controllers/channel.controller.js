import serverModel from "../models/server.model";

export const createChannel = async(req, res, next) => {
  try {
         
        const {serverId} = req.params;
        const {name, type, position, isPrivate} = req.body;

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found")
        }

        if(server.owner.toString () !== req.user._id.toString()){
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

// export const getServerChannels
// export const getChannelById
// export const updateChannel
// export const deleteChannel