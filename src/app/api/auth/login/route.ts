import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/userModel";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

// connect to database
connectDB();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                message: 'User not found'
            }, {
                status: 404
            })
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({
                message: 'Invalid credentials'
            }, {
                status: 401
            })
        }

        const tokenData = {
            id: user._id,
            name: user.fullname,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d'
        })

        const response = NextResponse.json({
            message: 'Login successful',
            success: false,
            token
        }, {
            status: 200
        })
        
        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'strict',
        })

        return response;

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, {
            status: 500
        })
    }

}