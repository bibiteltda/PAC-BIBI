import express from "express";
import bodyParser from "body-parser";
import changePasswordRoutes from "./routes/change_password_routes.js";

const app = express();
app.use(bodyParser.json());
app.use("/change-password", changePasswordRoutes);

export default app;