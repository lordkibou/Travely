import express from "express";
import { Request, Response } from "express";
import { body, check, validationResult } from "express-validator";
import User from "../models/user";
import multer from "multer";
import { HotelType } from "../models/hotel";
import Hotel from "../models/hotel";
import { uploadImagesToCloudinary } from "../utils";
import verifyToken from "../middleware/auth";
const router = express.Router();

const fileSizeLimitInMb = 5;
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * fileSizeLimitInMb, 
    }

});
/*
 * POST,
 * body:HotelType (multipart/formdata)->
 *
 * api/my-hotels
 *
 * -> 201, message:string | 500, message:string
 */
router.post(
    "/",
    verifyToken, [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
        body("facilities").notEmpty().isArray().withMessage("Facilities are required"),

    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHotel : HotelType = req.body;

            const imageUrls = await uploadImagesToCloudinary(imageFiles);

            newHotel.imageUrls = imageUrls;
            newHotel.lastUpdated = new Date();
            newHotel.userId = req.userId;

            const hotel = new Hotel(newHotel);
            await hotel.save();

            res.status(201).send(hotel);
        } catch (e) {
            console.log("Error creating hotel " + e);
            res.status(500).send("Something went wrong");
        }
    }
);

router.get("/", async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find();
        res.send(hotels);
    } catch (error) {
        res.status(400).send
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.send(hotel);
    } catch (error) {
        res.status(400).send
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body as any, { new: true });
        res.send(hotel);
    } catch (error) {
        res.status(400).send
    }
});


export default router;