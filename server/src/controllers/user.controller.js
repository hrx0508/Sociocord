import UserModel from "../models/user.model.js";

export const getMe = async(req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");

        if(!user) throw new ApiError(404, "User not found");

        return res.status(200).json(
            new ApiResponse(200, user, "User fetched successfully")
        )

    } catch (error) {
        next(error);
        
    }
}

export const updateProfile = async(req, res, next) => {
    try {
        
        const {username, fullname, mobile_no, dob} = req.body;
        const updateData = {};

        if(username !== undefined) updateData.username = username;
        if(fullname !== undefined) updateData.fullname = fullname;
        if(mobile_no !== undefined) updateData.mobile_no = mobile_no;
        if(dob !== undefined) updateData.dob = dob;

        const updateUser = await UserModel.findByIdAndUpdate(req.user.id, updateData, {
            new: true, runValidators: true
        }).select("-password");

        if(!updateUser) throw new ApiError(404, "User not found");
        return res.status(200).json(
            new ApiResponse(200, updateUser, "User profile updated successfully")
        )

    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async(req, res, next) => {
    try {
        const user = await UserModel.findOne({username: req.params.username}).select("-password");
        if(!user) throw new ApiError(404, "User not found");

        return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"))
    } catch (error) {
        next(error);
    }
}

export const searchUser = async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}
