import serverModel from "../models/server.model";
import serverMemberModel from "../models/serverMember.model";
import ApiError from "../utils/ApiError";

export const getServerMembers = async (req, res, next) => {
    try {
        const {severId} = req.params;

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found");
        }

        const members = await serverMemberModel.find({server: serverId}).populate("user", "username fullname profile_pic").populate("roles", "name permissions color position");

        return res.status(200).json(
            new ApiResponse(200, members, "Server members fetched successfully")
        )
    } catch (error) {
        next(error);
    }
}

export const removeMember = async(req, res, next) => {
    try{
        const {serverId, userId} = req.params;

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found");
        }

        if(server.owner.toString() !== req.user.id.toString()){
            throw new ApiError(403, "Only server owner can remove members")
        }

        const member = await serverMemberModel.findOne({
            server: serverId,
            user: userId
        })

        if(!member){
            throw new ApiError(404, "Member not found in this server")
        }

        if(server.owner.toString() === userId.toString()){
            throw new ApiError(400, "server owner cannot be removed")
        }

        await serverMemberModel.findByIdAndDelete(member._id);

        return res.status(200).json(
            new ApiResponse(200, null, "Member removed successfully")
        )
    }catch(error){
         next(error);
    }
}

export const updateMemberRoles = async(req, res, next) => {
    try {
        const {serverId, userId} = req.params;
        const {roles} = req.body;

        if(!Array.isArray(roles)){
            throw new ApiError(400, "Roles must be an array")
        }

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found");
        }

        if(server.owner.toString() !== req.user._id.toString()){
            throw new ApiError(403, "Only server owner can manage member roles")
        }

        const member = await serverMemberModel.findOne({
            server: serverId,
            user: userId
        });

        if(!member){
            throw new ApiError(404, "Member not found in this server")
        }

        if(server.owner.toString() === userId.toString()){
            throw new ApiError(404, "Server owner's roles cannot be changed")
        }

        const validRoles = await roleModel.find({
            _id: { $in: roles },
            server: serverId
        })

        if(validRoles.length !== roles.length){
            throw new ApiError(400, "One or more roles are invalid")
        }

        member.roles = roles;
        await member.save();

        const updateMember = await serverMemberModel.findById(member._id).populate("user", "username fullname profile_pic").populate("roles", "name permissions color position");

        return res.status(200).json(
            new ApiResponse(200, updateMember, "Member roles updated successfully")
        )
    } catch (error) {
        next(error);
    }
}