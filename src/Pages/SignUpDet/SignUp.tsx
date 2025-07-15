// pages/SecondPage.tsx (or just App.tsx if it's SPA)
import React, { useState } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import { useLocation } from "wouter";
import "./signup.css";
const SignUpPageDet: React.FC = () => {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [, setLocation] = useLocation();
    const handleSubmit = () => {
        console.log({ Username, Email, Password});
        setLocation("/Starter");
        // handle form submission
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-[#003321] to-[#001a11] flex items-center justify-center">
            <div className="bg-[#002619] p-8 rounded-2xl shadow-md w-80 text-center">
                <h2 className="text-white text-lg font-semibold mb-6">Input more details</h2>
                <InputField
                    placeholder="Username"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className=" text-white px-6 py-2 rounded-full mt-2 hover:bg-green-600 transition"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default SignUpPageDet;
