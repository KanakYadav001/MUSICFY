import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      function(value) {
        if (this.googleId) {
          return true;
        }
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
