import mongoose from "mongoose";
import bcrypt from "bcryptjs";
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

//Schema is like the blueprint for a model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName:{ type: String, required: true },
});

//Middleware from mongodb before saving the user, change password to hashed
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashed = await bcrypt.hash(this.get("password"), 8);
        this.set("password", hashed);
    }
    next();
});

//This is where we make the model based on the schema
const User = mongoose.model<UserType>("User", userSchema);

export default User;

