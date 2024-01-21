import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
const router = express.Router();
import { check, validationResult } from "express-validator";

/*
 * POST,
 * body:{email:string, password:string, firstName:string, lastName:string}->
 *
 * api/users/register
 *
 * -> 400, message:string | 200, JWT Cookie | 500, message:string
 */

//I want to make a middleware that checks if each field is filled and is string

router.post(
  "/register",
  [
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;
