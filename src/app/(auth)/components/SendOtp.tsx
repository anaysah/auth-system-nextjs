import axios from "axios";
import { useEffect, useState } from "react";

const SendOtp = ({ email }: { email: string }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [disabled, setDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);


    useEffect(() => {
        if (timeLeft === 0) {
            setDisabled(false)
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000); 

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const sendOtp = async () => {
        try {
            if (email === "") throw new Error("Email is required");
            if (disabled) return;

            setDisabled(true);
            setLoading(true);
            
            const res = await axios({
                method: 'POST',
                url: '/api/auth/login/forgot-password/send-otp',
                data: { email }
            })
            console.log(res);
            setLoading(false);
            setTimeLeft(5)
            setMessage(res.data.message);
        } catch (error: any) {
            // console.log(error);
            if(error.message){
                setMessage(error.message)
                return;
            }
            setMessage(error.response.data.message);
            setLoading(false);
            setDisabled(false);
            setTimeLeft(0)
        }
    }

    return (
        (
            <>
                <button disabled={disabled} onClick={sendOtp} className={(disabled ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700")+" text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2"}>
                    {loading ? 'Sending...' : 'Send OTP'}
                </button>
                <span>
                    {disabled && timeLeft > 0 ? `Resend otp in ${timeLeft} seconds` : ""}
                </span>
                <div className="text-sm mb-2">
                    {message ? message : "Send OTP to email"}
                </div>
            </>
        )
    )
}


export default SendOtp;