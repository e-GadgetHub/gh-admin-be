import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        parentCategoryId: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "categories" }
);

CategorySchema.index({ name: 1 }, { unique: true });

const Category = mongoose.model("categories", CategorySchema);
export default Category;
