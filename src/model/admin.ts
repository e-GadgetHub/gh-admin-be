import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { collection: "admins" }
);

AdminSchema.index({ username: 1 }, { unique: true });

const Admin = mongoose.model("admins", AdminSchema);
export default Admin;
