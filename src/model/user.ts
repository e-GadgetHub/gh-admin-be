import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        avatar: {
            type: String,
            default: "https://res.cloudinary.com/dydmnzkfh/image/upload/v1713671817/ekv4nylpxrwvmacu2cbj.jpg",
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "users" }
);

UserSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.model("users", UserSchema);
export default User;
