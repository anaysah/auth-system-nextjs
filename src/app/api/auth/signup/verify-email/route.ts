import { NextRequest, NextResponse } from "next/server";
import { ResponseError } from "@/app/helpers/responseError";
import jwt from "jsonwebtoken";
import User from "@/app/models/userModel";

interface TokenData {
    email: string; // Assuming your token contains an 'id' field
}

//route for verification of user
export async function POST(request:NextRequest){
    try{
        const requestBody = await request.json();
        const {token} = requestBody;

        if(!token){
            throw new ResponseError("Missing query parameter", false, 400)
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;
        const email = decodedToken.email;

        // Update user's status to verified in the database
        const user = await User.findOne({ email });
        console.log(user.email)
        if (!user) {
            throw new ResponseError("User not found with given token", false, 404)
        }

        if(user.isVerified){
            throw new ResponseError("User is already verified", false, 400)
        }

        if(user.verificationToken !== token){
            throw new ResponseError("Invalid verification token", false, 400)
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message:"User verified succesfully", success:true },{status:200})

    }catch (e:any){
        if (e instanceof ResponseError) {
            return NextResponse.json({ message: e.message, success:e.success }, { status: e.statusCode });
        }
        console.log(e);
        return NextResponse.json({ message: "Internal Server Error", success:false }, { status: 500 });
    }
}