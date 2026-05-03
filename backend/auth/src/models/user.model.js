import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      function() {
        return !this.googleId;
      },
    },
    goodleId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "artist"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
