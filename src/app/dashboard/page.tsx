"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "Loading...",
        email: "Loading..."
    })

    const logout = async () => {
        try {
            await axios.get("/api/auth/logout");
            router.push("/login");
        } catch (e: any) {
            console.log(e.message);
        }
    }

    const getUserData = async () => {
        try {
            const res = await axios.get("/api/user")
            console.log(res)
            setUser({
                name: res.data.userData.fullname,
                email: res.data.userData.email
            })
        } catch (e: any) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between">

                <h1 className="text-3xl font-bold">Dashboard</h1>

                {/* logout button */}
                <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>

            </div>
            <div>
                <div>User Data</div>
                <div className="flex flex-col">
                    <span>Name: {user.name}</span>
                    <span>Email: {user.email}</span>
                </div>
            </div>
        </div>
    )
}