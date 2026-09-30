import serverMemberModel from "../models/serverMember.model.js"

export const createServerMember = async (userId, serverId, roles=[]) => {
    return await serverMemberModel.create({
        user: userId,
        server: serverId,
        roles
    })
}