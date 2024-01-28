import { NextFunction } from "express-serve-static-core";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
    
}

const verifyToken = (req:Request, res:Response, next:NextFunction) => { 
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        //Returns the payload inside of the token if the signature is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        //We take the userId from the payload and put it in the request
        req.userId = (decoded as JwtPayload).userId;
        
        next();//Continue with 200 Code and userId in body
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default verifyToken;