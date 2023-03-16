import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  userID: String,
  Username: {type: String, default: null},
  Password: {type: String, default: null},
  Avatar: {type: String, default: null},
  Perms: {type: Array, default: []}
  });
const User = mongoose.models.usersWeb || mongoose.model("usersWeb", UsersSchema);

export default User