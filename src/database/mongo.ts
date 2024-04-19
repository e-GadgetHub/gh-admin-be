import mongoose from "mongoose";

export default async function db() {
    await mongoose.connect("mongodb+srv://fahmiah:fahmi123@gadgethub.tv4sufe.mongodb.net/GadgetHub");
}
