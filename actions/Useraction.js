"use server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";
import User from "@/models/User";

export const initiatePayment = async (amt, to_username, PaymentForm) => {
    await connectDB();
    let user = await User.findOne({ username: to_username });

    var instance = new Razorpay({ key_id: user.razorpayId, key_secret: user.razorpaySecret });
    let options = {
        amount: amt * 100,
        currency: "INR",
    };
 let order = await instance.orders.create(options);
    await Payment.create({
        name: PaymentForm.name,
        to_user: to_username,
        oid: order.id,
        message: PaymentForm.message,
        amount: amt,
    });
    return order;
};

export const fetchuser = async (us) => {
    await connectDB();

    // Find user by username
    let user = await User.findOne({ username: us });

    // Check if user is null or undefined
    if (!user) {
        throw new Error(`User with username ${us} not found`);
    }

    // Safely call .toObject() only if user is found
    let u = user.toObject({ flattenObjectIds: true });
    return u;
};


export const fetchpayments = async (username) => {
    await connectDB();

    let payments = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 })
        .lean();

    // Transform the documents to plain objects
    return payments.map(payment => ({
        ...payment,
        _id: payment._id.toString(), // Convert ObjectId to string
        createdAt: payment.createdAt?.toISOString(), // Convert Date to ISO string
        updatedAt: payment.updatedAt?.toISOString(), // Convert Date to ISO string
    }));
};

export const updateprofile = async (username, oldusername) => {
    await connectDB();
    let ndata = Object.fromEntries(username);

    if(oldusername != ndata.username) {
        let user = await User.findOne({ username: ndata.username });
        if(user) {
            return ({"error": "Username already exists"});
        }
    }
    await User.findOneAndUpdate({ email: ndata.email }, ndata);
}