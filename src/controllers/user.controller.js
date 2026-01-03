import userModel from "../models/user.model.js";
import { signupValidation , loginValidation } from "../validations/user.validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();



export const signupControllers=async(req , res )=>{
    try {
        const safeparse=signupValidation.safeParse(req.body);
        if(!safeparse.success){
            return res.status(400).json({"success": false,"error":"Invalid request schema",});
        }
        console.log(safeparse.data);

        //check if user already exists
        const isUserExist=await userModel.findOne({email:safeparse.data.email});
        if(isUserExist){
            return res.status(400).json({"success": false,"error":"Email already exists",});
        }

        //save in db
        const newUser=new userModel(safeparse.data);
        await newUser.save();

        return res.status(201).json({"success": true,data:newUser});
    } catch (error) {
        console.error("Error in signupControllers:", error);
        res.status(500).json({"success": false,"error":"Internal server error",});
    }
}

export const loginControllers=async(req , res )=>{
    try {
        const safeparse = loginValidation.safeParse(req.body);
        if(!safeparse.success){
            return res.status(400).json({"success": false,"error":"Invalid request schema",});
        }

        const user = await userModel.findOne({ email: safeparse.data.email });
        if(!user){
            return res.status(400).json({"success": false,"error":"Invalid email or password",});
        }
        // Password verification logic should be here (e.g., bcrypt comparison)
        const token =await jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({"success": true,"data":{"token":token},});

    } catch (error) {
        console.error("Error in loginControllers:", error);
        res.status(500).json({"success": false,"error":"Internal server error",});
    }
}

export const meControllers=(req , res )=>{
    try {

    } catch (error) {

    }
}