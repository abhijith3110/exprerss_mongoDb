import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/databaseConfig.js";
import router from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use("/api", router);
const Port = process.env.PORT || 8081;

app.listen(Port, () => {
  console.log(`Server is Running on Port ${Port}`);
});
