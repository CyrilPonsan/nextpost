import express from "express";
import {
  httpHandshake,
  httpLogin,
  httpLogout,
} from "../../controllers/auth/auth.controller";

const authRouter = express.Router();

authRouter.post("/", httpLogin);
authRouter.get("/", httpLogout);
authRouter.get("/handshake", httpHandshake);

export default authRouter;
