import express from "express";
import { body } from "express-validator";

import httpLogin from "../../controllers/auth/httpLogin";
import httpLogout from "../../controllers/auth/httpLogout";
import httpHandshake from "../../controllers/auth/httpHandshake";

const authRouter = express.Router();

authRouter.post(
  "/",
  body("username").isEmail().withMessage("Email invalide").notEmpty().escape(),
  body("password")
    .isString()
    .withMessage("Mot de passe invalide")
    .notEmpty()
    .escape(),
  httpLogin
);
authRouter.get("/", httpLogout);
authRouter.get("/handshake", httpHandshake);

export default authRouter;
