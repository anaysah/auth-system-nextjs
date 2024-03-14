import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { ResponseError } from "@/app/helpers/responseError";
import { sendMail } from "@/app/helpers/sendMail";


//function to  generate a otp
function generateOtp() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const otpLength = 6;
    let otp = '';

    for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
}


// generate and send otp
export async function POST(request: NextRequest) {
    try {
        const resbody = await request.json();
        const { email } = resbody

        const user = await User.findOne({ email });

        if (!user) {
            throw new ResponseError("User not found", false, 404);
        }

        const otp = generateOtp();

        user.forgotPasswordToken = otp;
        user.forgotPasswordExpiry = Date.now() + 60 * 60 * 24 * 1000; // 24 hours

        await user.save();

        await sendMail("RESET", otp);

        return NextResponse.json({ message: "OTP send succesfully", success: true }, { status: 200 })

    } catch (e: any) {
        if (e instanceof ResponseError) {
            return NextResponse.json({ message: e.message, success: e.success }, { status: e.statusCode });
        }
        console.log(e);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }

}