import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
    {
        street: { type: String, required: true },
        regency: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },
        postalCode: { type: Number, required: true },
        userId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: null },
    },
    { collection: "addresses" }
);

AddressSchema.index({ userId: 1 }, { unique: true });

const Address = mongoose.model("addresses", AddressSchema);
export default Address;
