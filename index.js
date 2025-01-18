import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { isAuth, sanitizeUser, cookieExtractor } from "./services/common.js";
import { User } from "./model/User.model.js";
import productRouter from "./routes/Product.route.js";
import userRouter from "./routes/User.router.js";
import authRouter from "./routes/Auth.route.js";
import addressRouter from "./routes/Address.route.js";
import cartRouter from "./routes/Cart.route.js";
import orderRouter from "./routes/Order.route.js";

import express from "express";
const app = express();
app.use(cors({ origin: "*", exposedHeaders: ["X-Total-Count"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://cdn.dummyjson.com", "*"], // Allow localhost during development
      },
    },
  })
);
app.use(cookieParser());

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

app.use(express.static("build"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use(passport.authenticate("session"));

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            done(null, false, { message: "invalid credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY);
            done(null, { id: user?.id, role: user?.role, token }); // this lines sends to serializer
          }
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this create session variable req.user on being called from callback

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this create session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.get("/", (req, res) => {
  res.send({ status: "server started successfully" });
});

app.use("/products", isAuth(), productRouter);
app.use("/users", isAuth(), userRouter);
app.use("/auth", authRouter);
app.use("/addresses", isAuth(), addressRouter);
app.use("/cart", isAuth(), cartRouter);
app.use("/orders", isAuth(), orderRouter);

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
