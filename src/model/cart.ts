import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        variantId: { type: Array<String>, required: true },
        userId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "carts" }
);

CartSchema.index({ userId: 1 }, { unique: true });

const Address = mongoose.model("carts", CartSchema);
export default Address;
