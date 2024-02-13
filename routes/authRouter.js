import express from "express";
import { login, signUp } from "../controllers/authControllers";



const authRouter = express.Router();

authRouter.post("/signup", signUp); 
authRouter.post("/login", login);


export default authRouter;
