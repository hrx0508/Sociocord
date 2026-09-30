import serverModel from "../models/server.model.js";

export const createRole = async (req, res, next) => {
    try {
        const {serverId} = req.params;

        const { name, permissions, color, position} = req.body;

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found");
        }

        if(server.owner.toString() !== req.user.id.toString()){
            throw new ApiError(403, "Only server owner can create roles")
        }

        const role = await roleModel.create({
            name,
            server: serverId,
            permissions,
            color,
            position
        })

        return res.status(201).json(
            new ApiResponse(201, role, "Role created successfully")
        )
    } catch (error) {
        next(error);
    }
}

export const getServerRoles = async(req, res, next) => {
    try {
        const { serverId } = req.params;
        
        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found")
        }

        const roles = await roleModel.find({ server: serverId }).sort({ position: -1 })

        return res.status(200).json(
            new ApiResponse(200, roles, "Server roles fetched successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const updateRole = async (req, res, next) => {
    try {
        
        const {serverId, roleId} = req.params;

        const { name, permissions, color, position } = req.body;

        const server = await serverModel.findById(serverId);

        if(!server){
            throw new ApiError(404, "Server not found")
        }
    } catch (error) {
        
    }
}