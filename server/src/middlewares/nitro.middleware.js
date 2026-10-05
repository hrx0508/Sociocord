import nitroModel from "../models/nitro.model.js";
import ApiError from "../utils/ApiError.js";

export const requireNitro = async (req, res, next) => {
    try {
        const nitro = await nitroModel.findOne({
            user: req.user._id,
            status: "active",
            endDate: {
                $gt: new Date(),
            },
        });

        if (!nitro) {
            throw new ApiError(
                403,
                "Sociocord Nitro is required for this feature"
            );
        }

        req.nitro = nitro;

        next();

    } catch (error) {
        next(error);
    }
};