"use client"
import { useEffect, useState } from "react";
import LogInForm from "../components/LogInForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export type LoginFormUserType = {
    email: string;
    password: string;
}

export default function Login(){
    const router = useRouter()
    const [user, setUser] = useState<LoginFormUserType>({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const [Loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<String>("")

    const onLogin = async() => {
        try{
            setLoading(true)
            setError("")
            setSuccess("")
            await axios.post("/api/auth/login", user)
            setSuccess("Login Successful")
            setLoading(false)
            router.push("/dashboard")
        }catch (e:any){
            // setError(e.message)
            setError(e.response.data.message)
            console.log(e)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email === "" || user.password === ""){
            setButtonDisabled(true)
        }else{
            setButtonDisabled(false)
        }
    }, [user])


    return (
        <div className="container mx-auto p-4">
            <h1>Login</h1>
            <LogInForm user={user} setUser={setUser} onLogin={onLogin} buttonDisabled={buttonDisabled} setButtonDisabled={setButtonDisabled} Loading={Loading} setLoading={setLoading} error={error} setError={setError} success={success} setSuccess={setSuccess} />
        </div>
    )
}