// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   _id: {type: String, required: true},
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   image: { type: String, required: true }
// });

// const User = mongoose.model("User", userSchema);
// export default User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Clerk user id
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // 🔥 THIS IS THE MISSING LINE
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
