import { NextRequest, NextResponse } from "next/server";
import { ResponseError } from "@/app/helpers/responseError";
import { error } from "console";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs"

// to change the password of a user
export async function POST(request:NextRequest){
    try{
        const resbody = await request.json();
        const {email, otp,password, confirmPassword} = resbody
    
        if(password!==confirmPassword){
            throw new ResponseError("both password doesn't match", false, 400)
        }

        const user = await User.findOne({email:email})

        if(user.forgotPasswordToken!==otp){
            throw new ResponseError("Invalid otp", false, 400)
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        user.password = hashedPassword
        user.forgotPasswordToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()

        return NextResponse.json({ message: "password changed successfully", success: true }, { status: 200 })

    }catch(e:any){
        if (e instanceof ResponseError) {
            return NextResponse.json({ message: e.message, success: e.success }, { status: e.statusCode });
        }
        console.log(e);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });

    }
}