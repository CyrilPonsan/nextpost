import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import api from "./routes/v1/v1.router";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import expressSession from "express-session";
import connection from "./db/connection";
const SequelizeStore = require("connect-session-sequelize")(
  expressSession.Store
);

const SECRET_1 = process.env.SECRET_1!;
const SECRET_2 = process.env.SECRET_2!;

// declare the email property on SessionData interface
declare module "express-session" {
  interface SessionData {
    email: string;
    userId: string;
    roles: string[];
  }
}

const app = express();

app
  .use(helmet())
  .use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  )
  .use(morgan("combined"))
  .use(express.json())
  .use(express.static(path.join(__dirname, "..", "public")));

app.use(
  expressSession({
    secret: SECRET_1,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 20 * 60 * 1000,
      secure: false,
      sameSite: "lax",
      httpOnly: true,
    },
    store: new SequelizeStore({ db: connection }),
  })
);

app.use("/v1", api);

/* app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
 */
app.use(({ res }: { res: Response }) => {
  const message = "Impossible de trouver les ressource demandées.";
  res.status(404).json(message);
});

export default app;
