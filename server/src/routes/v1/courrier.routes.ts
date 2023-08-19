import express from "express";
import { query } from "express-validator";

import httpGetCourriers from "../../controllers/courrier.ts/httpGetCourriers";
import isLogged from "../../middlewares/isLogged";
const courrierRouter = express.Router();

courrierRouter.get(
  "/",
  isLogged,
  query("page").isNumeric().notEmpty().escape(),
  query("limi").isNumeric().notEmpty().escape(),
  query("type").isBoolean().notEmpty().escape(),
  query("field").isString().notEmpty().escape(),
  query("direction").isString().notEmpty().escape(),
  httpGetCourriers
);

export default courrierRouter;
