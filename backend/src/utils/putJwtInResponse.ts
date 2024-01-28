import jwt from "jsonwebtoken";
import { Response } from "express";

const putJwtInResponse = (res: Response, userId: string): void => { 
    
    //We hide the userId in the token
    const token = jwt.sign(
        { userId: userId },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
    });
}

export default putJwtInResponse;