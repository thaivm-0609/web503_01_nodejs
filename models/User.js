import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        email: { type: String, require:true, unique:true},
        password: { type: String, require:true }
    }, 
    { timestamp: true}
);
const User = mongoose.model("User", UserSchema);

export default User;
