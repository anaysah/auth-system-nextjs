"use client"
import { useEffect, useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { useRouter } from "next/router";
import axios from "axios";
import { set } from "mongoose";


export type UserFormType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Signup() {
    // const router = useRouter();
    const [user, setUser] = useState<UserFormType>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [Loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<String>("")

    const onSignup = async() => {
        try{
            setLoading(true)
            const response = await axios.post("api/auth/signup", user)
            if(response.status === 200){
                setSuccess("User created successfully")
                setError("")
            }else{
                setError(response.data.message)
            }
            console.log(response)
        }catch(err: any){
            setError(err.message)
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.confirmPassword.length > 0 && user.firstName.length > 0 && user.lastName.length > 0){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-2"><center>Signup</center> </h1>
                <SignUpForm user={user} setUser={setUser} error={error} success={success} Loading={Loading} onSignup={onSignup} buttonDisabled={buttonDisabled}/>
            </div>
        </div>
    )
}