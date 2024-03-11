import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB()


export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)

        // console.log("this is id",userId)
        const user = await User.findOne({_id:userId}).select("-password");
        if (!user) {
            throw new Error("User not in database");
        }

        return NextResponse.json({message:"user found", userData:user}, {status:200})
    } catch (e: any) {
        console.log("error in route.ts of user")
        return NextResponse.json({ error: e.message }, { status: 400 })
    }
}