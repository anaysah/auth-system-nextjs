"use client"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

//email verification page
export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter();

    const verifyEmail = async () => {
        try {
            if (!token) throw new Error("Token is missing");
            const res = await axios("/api/auth/signup/verify-email", {
                method: "POST",
                data: {
                    token: token
                }

            });
            if (!res.data.success) {
                throw new Error(res.data.message);
            }
            setIsLoading(false)
            setMessage("hey! You are verified now")
        } catch (e: any) {
            console.log(e.response.data.message);
            setMessage(e.response.data.message)
        } finally {
            // wait for 1s
            setTimeout(() => {
                router.push('/login');
            }, 1500);
        }
    };

    //verify email address
    useEffect(() => {
        verifyEmail();
    }, [])

    return (
        <div>
            <h1>Email Verification</h1>
            <p>
                {isLoading ? "Please wait while we verify your email address" : message}
            </p>
        </div >
    );
}