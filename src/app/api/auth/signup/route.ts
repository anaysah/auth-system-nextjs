import { sendMail } from "@/app/helpers/sendMail";
import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/userModel";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

interface TokenData {
    id: string; // Assuming your token contains an 'id' field
    name: string,
    email:string
}

export async function POST(request:NextRequest){
    try{
        const requestBody = await request.json();
        const {firstName,lastName, email,password} = requestBody;
        const fullname = `${firstName} ${lastName}`;

        console.log(requestBody);

        const user = await User.findOne({email});

        if(user){
            return new Response(JSON.stringify({message:"User already exists"}),{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const tokenData = {
            email: email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d'
        })

        const newUser = await new User({
            fullname,
            email,
            password:hashedPassword,
            verificationToken: token,
            verifyTokenExpiry: Date.now() + 60 * 60 * 24,
        }).save();

        await sendMail("VERIFY", token)

        console.log(newUser);

        // return NextResponse.json({message:"User created successfully", newUser: {_id:newUser._id,fullname:newUser.fullname,email:newUser.email}}, {status:200});
        return Response.json(JSON.stringify({message:"User created successfully", newUser}), {status:200});

    }catch (error){
        return new Response(JSON.stringify({message:error}),{status:500})
    }
}

export async function GET(){
    //get all users
    const users = await User.find();
    return NextResponse.json(users, {status:200});
}