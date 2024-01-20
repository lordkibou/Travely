import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(cors());//This is for the frontend to be able to access the backend and port compatibility
app.use(express.urlencoded({ extended: true })); //Parse url

//Endpoint
app.get("/api/test",async (req:Request,res:Response) => {
    res.json({message:"Hello World"})
})

app.listen(7000, () => {
    console.log("Server running on port 7000")
})
