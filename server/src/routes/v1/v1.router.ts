import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./expediteur.routes";

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/expediteur/", userRouter);

export default v1Router;
