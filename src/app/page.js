'use client'
import React, { useState } from "react";
import Toast from "@/app/Toast";
import {Avatar, AvatarGroup} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: email,
                password: password
            })
        };

        fetch("http://localhost:8081/project/login", requestOptions)
            .then((response) => {
                if (response.ok) {
                    Toast.fire({
                        icon: "success",
                        title: "Login successful"
                    }).then(() => {
                        router.push('/dashboard')
                    });
                    response.json().then((data) => {
                        console.log(data.userlevel);
                    })
                } else {
                    response.text().then((data) => {
                        Toast.fire({
                            icon: "error",
                            title:data
                        });
                    })

                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://i.ibb.co/Gk81yNQ/web.jpg"
                         alt="Placeholder Image" className="object-cover w-full h-full"/>
                </div>
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
                    <h1 className="text-2xl font-semibold mb-4 text-black">Login</h1>
                    <form action="#" method="POST">
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-600">Email</label>
                            <input type="text" id="username" name="username"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
                                   autoComplete="off"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">Password</label>
                            <input type="password" id="password" name="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-gray-600"
                                   autoComplete="off"/>
                        </div>
                        <div className="mb-4 flex items-center">
                            <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
                            <label htmlFor="remember" className="text-gray-600 ml-2">Remember Me</label>
                        </div>
                        <div className="mb-6 text-blue-500">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                        </div>

                    </form>
                    <button onClick={handleLogin}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login
                    </button>

                   

            </div>
            </div>
        </div>
    );
}
