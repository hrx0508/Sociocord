import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createNitroOrder = async (req, res, next) => {
    try {
        const amount = 29900;

        const order = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `nitro_${req.user._id}_${Date.now()}`,
        });

        await paymentModel.create({
            user: req.user._id,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            product: "nitro",
            status: "created",
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    orderId: order.id,
                    amount: order.amount,
                    currency: order.currency,
                    keyId: process.env.RAZORPAY_KEY_ID,
                },
                "Nitro order created successfully"
            )
        );
    } catch (error) {
        next(error);
    }
};