import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";
import usersRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));//This is for the frontend to be able to access the backend and port compatibility
app.use(express.urlencoded({ extended: true })); //Parse url

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
    console.log("Server running on port 7000")
})
