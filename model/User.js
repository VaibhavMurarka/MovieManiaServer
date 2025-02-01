import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", Schema);

export default User;