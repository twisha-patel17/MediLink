import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(

    cors({

        origin: [

            "http://localhost:5173",

            process.env.CLIENT_URL,

        ],

        credentials: true,

    })

);


app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {

    res.send(
        "MediLink Backend is running."
    );

});


const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(

        `Server is running on ${PORT}`

    );

});