"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    const authToken = Cookies.get('authToken')

    if (authToken) {
        router.push('/')
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost/user-management/api/users/login", {
                username,
                password,
            });

            // Assuming the response contains the token
            if (response.data.token) {
                const authToken = response.data.token;
                Cookies.set('authToken', authToken);
                router.push('/dashboard/patient');
            } else {
                setMessage("Login failed. Please try again.");
            }
        } catch (error) {
            setMessage("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Login</h2>
                </div>
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full text-white py-2 rounded-lg">
                        Login
                    </Button>
                </form>
                {message && <p className="text-center text-red-500">{message}</p>}
            </div>
        </div>
    );
}
