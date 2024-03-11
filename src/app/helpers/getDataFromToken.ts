import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenData {
    id: string; // Assuming your token contains an 'id' field
    name: string,
    email:string
}

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value || "";
        // console.log(token)

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;

        // Extract data from the decoded token
        const userId = decodedToken.id;
        // console.log(userId)

        return userId;
    } catch (error) {
        // Handle verification failure
        console.error("Token verification failed:", error);
        return null;
    }
};
