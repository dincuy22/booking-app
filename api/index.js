import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      dbName: "booking",
    });
    console.log("konek ke mongo db");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to db");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnect from db");
});

// middleware -> use

// by default tidak bisa mengirim (post) data json
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);

// dijalankan jika ada next() dari middleware sebelumnya
app.use((req, res, next) => {
  console.log("hai aim middleware");
});

// jalankan server
app.listen(8800, () => {
  connect();
  console.log("konek ke server http://localhost:8800");
});
