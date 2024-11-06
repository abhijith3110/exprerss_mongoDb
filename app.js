import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/databaseConfig.js";
import router from "./routes/userRoutes.js";


const app = express();

dotenv.config();

app.use(express.json());

connectDB();

app.use("/api", router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  next()
});

const Port = process.env.PORT || 8081;

app.listen(Port, () => {
  console.log(`Server is Running on Port ${Port}`);
});
