import userModel from "../models/user.model.js";
import { signupValidation , loginValidation } from "../validations/user.validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { addClassValidation } from "../validations/class.validation.js";
import classModel from "../models/class.model.js";
dotenv.config();



export const addClass =async (req , res) =>{
    try {
        const id = req.user.userId;
        const role = req.user.role;
        if(role !== 'teacher'){
            return res.status(403).json({
                "success": false,
                "error": "Forbidden, only teachers can add classes"
            });
        }
        const safeparse=addClassValidation.safeParse(req.body);
        if(!safeparse.success){
                    return res.status(400).json({"success": false,"error":"Invalid request schema",});
                }
        console.log(safeparse.data);

        const addClass = await classModel.create({
             ...safeparse.data,
           teacherId: id

        })
        res.status(201).json({"success": true, data: addClass
        });
    } catch (error) {
        console.error("Error in addClass:", error);
        res.status(500).json({"success": false,"error":"Internal server error",});
    }
}