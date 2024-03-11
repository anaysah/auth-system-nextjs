"use client"
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";


export default function Signup() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const onSignup = async (e: any) => {
        e.preventDefault();
    }

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-2"><center>Signup</center> </h1>
                <SignUpForm />
            </div>
        </div>
    )
}