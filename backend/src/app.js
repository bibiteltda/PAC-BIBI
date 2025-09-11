import express from "express";
import bodyParser from "body-parser";
import authMailRoutes from "./routes/auth_mail_routes.js";

const app = express();
app.use(bodyParser.json());
app.use("/auth", authMailRoutes);

export default app;