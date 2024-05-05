import jwt from "jsonwebtoken";
import { Response } from "express";
import cloudinary from "cloudinary";

export const putJwtInResponse = (res: Response, userId: string): void => { 
    
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

export const uploadImagesToCloudinary = async (imageFiles: Express.Multer.File[]): Promise<string[]> => {
    const uploadImages = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });
    return Promise.all(uploadImages);
}
