import express from "express";
import cors from "cors";
import db from "./src/database/mongo";
import routes from "./src/routes";
import "dotenv/config";

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
app.use("/api", routes);

db().catch((err) => console.log(err));

app.listen(3000, () => console.log("Server is running"));
