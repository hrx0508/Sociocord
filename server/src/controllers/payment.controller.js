import razorpay from "../config/razorpay.js";
import paymentModel from "../models/payment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const NITRO_AMOUNT = 29900;
const NITRO_DURATION_DAYS = 30;

export const createNitroOrder = async (req, res, next) => {
    try {
        
        const order = await razorpay.orders.create({
            amount: NITRO_AMOUNT,
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


export const verifyNitroPayment = async(req, res, next) => {
    try {
        const{
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature,
        } = req.body;

        if(!orderId || !paymentId || !signature){
            throw new ApiError(400, "Payment verification details are required")
        }
        
        const payment = await paymentModel.findOne({
            orderId,
            user: req.user._id,
            product: "nitro"
        })

        if(!payment){
            throw new ApiError(404, "Payment order not found")
        }

        if(payment.status === "paid"){
            if(payment.paymentId !== paymentId){
                throw new ApiError(400, "Payment does not match this order")
            }

            const existingNitro = await nitroModel.findOne({
                user: req/user._id,
                razorpayPaymentId: paymentId,
            });

            if(existingNitro){
                return res.status(200).json(
                    newApiResponse(200, {paymentId, endDate: existingNitro.endDate}, "Payment already verified")
                )
            }
        }
    } catch (error) {
        next(error)
    }
}