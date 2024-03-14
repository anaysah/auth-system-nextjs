"use client"
import { set } from "mongoose";
import { useEffect, useState } from "react";
import SendOtp from "../../components/SendOtp";
import axios from "axios";

type FormFieldsType = {
    password:string,
    confirmPassword:string,
    email:string,
    otp:string
}

export default function ForgotPassword(){
    const [formFields, setFormFields] = useState<FormFieldsType>({
        password: "",
        confirmPassword: "",
        email: "",
        otp:""
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onLogin = async() => {
        try{
            setIsLoading(true)
            const res =await axios({
                method: 'POST',
                url: '/api/auth/login/forgot-password',
                data: formFields
            })
            setIsLoading(false)
            setMessage(res.data.message)
        }catch(e:any){
            setMessage(e.response.data.message);
            setIsLoading(false)
        }
    }

    return (
        <div className="form-wrapper p-4">
            <div>
                <label htmlFor="password">Email</label>
                <input value={formFields.email} onChange={(e)=>setFormFields({...formFields, email:e.target.value})} type="email" name="email" id="email" autoComplete="off"/>
                <SendOtp email={formFields.email}/>
            </div>
            <div>
                <label htmlFor="otp">OTP</label>
                <input value={formFields.otp} onChange={(e)=>setFormFields({...formFields, otp:e.target.value})} type="text" name="otp" id="otp" autoComplete="off"/>
            </div>
            <div>
                <label htmlFor="password">New Password</label>
                <input value={formFields.password} onChange={(e)=>setFormFields({...formFields, password:e.target.value})} type="password" name="password" id="password" autoComplete="new-password"/>
            </div>
            <div>
                <label htmlFor="password">Confirm Password</label>
                <input value={formFields.confirmPassword} onChange={(e)=>setFormFields({...formFields, confirmPassword:e.target.value})} type="password" name="confirm-password" id="confirm-password" />
            </div>
            <button disabled={isLoading} onClick={onLogin} className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2`}>
                {isLoading ? "Chaning Password..." : "Change Password"}
            </button>
            <p className="text-green-500">{message}</p>
        </div>
    )
}