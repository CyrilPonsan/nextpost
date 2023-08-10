import express from "express";
import httpGetCourriers from "../../controllers/courrier.ts/httpGetCourriers";
import isLogged from "../../middlewares/isLogged";

const userRouter = express.Router();

userRouter.get("/", isLogged, httpGetCourriers);

export default userRouter;
