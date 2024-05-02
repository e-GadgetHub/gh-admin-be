import express from "express";
import cors from "cors";
import router from "./src/routes";
import "dotenv/config";
import { config } from "./src/libs/cloudinary";
import prisma from "./src/db/prisma";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", router);
config();

prisma.$connect().catch((e) => {
  console.log(e);
});

app.listen(5000, () => console.log("Server is running"));
