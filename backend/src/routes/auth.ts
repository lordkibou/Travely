import express from "express";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import putJwtInResponse from "../utils/putJwtInResponse";
const router = express.Router();

/*
 * POST,
 * body:{email:string, password:string}->
 *
 * api/auth/login
 *
 * -> 400, message:string | 200, JWT Cookie,{userId:string} | 500, message:string
 */

//I want to make a middleware that checks if each field is filled and is string
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password }: { email: string; password: string } = req.body;

    try {
      const user = await User.findOne({ email });
      let isMatch = false;

      user ? (isMatch = await bcrypt.compare(password, user.password)) : null;

      if (!user || !isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      putJwtInResponse(res, user.id);

      return res.status(200).json({ userId: user._id });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default router;
