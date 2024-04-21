import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
    {
        rating: { type: Number, required: true },
        testimonial: { type: String, required: true },
        productId: { type: String, required: true },
        variantId: { type: Array<String>, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "reviews" }
);

const Address = mongoose.model("reviews", ReviewSchema);
export default Address;
