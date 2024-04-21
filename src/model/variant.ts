import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        productId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "variants" }
);

const Variant = mongoose.model("variants", VariantSchema);
export default Variant;
