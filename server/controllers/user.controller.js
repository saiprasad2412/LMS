import { User } from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const register =async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //if email already exists
        const existUser= await User.findOne({email});
        if(existUser){
            return res.status(400).json({success:false,
                message:"User already exists"})
        }

        //hash the password
        const hashedPassword= await bcrypt.hash(password,10);



        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            success:true,
            data:user,
            message:"User created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message ||"Failed to create user"
        })
        
    }
}

export const login =async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //check if user exists  
        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        generateToken(user,res,`Welcome back ${user.name}`);


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message ||"Failed to login"
        })
        
    }
}