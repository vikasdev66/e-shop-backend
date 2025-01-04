import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/product.route.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));

app.get("/", (req, res) => {
  res.send({ status: "server started successfully" });
});

app.use("/products", productRouter);

mongoose
  .connect(
    `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0.ipjp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to database");
    app.listen(process.env.LOCAL_PORT, () => {
      console.log("server is running on port", process.env.LOCAL_PORT);
    });
  })
  .catch((error) => {
    console.log("Database connection failed!", error);
  });
