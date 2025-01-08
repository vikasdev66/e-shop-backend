import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/Product.route.js";
import userRouter from "./routes/User.router.js";
import authRouter from "./routes/Auth.route.js";
import addressRouter from "./routes/Address.route.js";
import cartRouter from "./routes/Cart.route.js";
import helmet from "helmet";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));

app.get("/", (req, res) => {
  res.send({ status: "server started successfully" });
});

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/addresses", addressRouter);
app.use("/cart", cartRouter);

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
