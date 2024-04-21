import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: Array<String>, required: true },
        stock: { type: Number, required: true },
        categoryId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "products" }
);

ProductSchema.index({ name: 1 }, { unique: true });

const Product = mongoose.model("products", ProductSchema);
export default Product;
