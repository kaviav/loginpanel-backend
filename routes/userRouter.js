import express from "express";
import { addUser, getAll, userStats } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.post("/addUser", addUser);
userRouter.get("/getall", getAll);
userRouter.get("/getstats", userStats);

export default userRouter;
