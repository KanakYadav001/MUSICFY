import express from "express";
import { register, login, GoogleLogin } from "../controller/auth.controller.js";

import passport from "passport";

import {
  registerValidator,
  loginValidator,
} from "../middleware/validator.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  GoogleLogin,
);

export default authRouter;
