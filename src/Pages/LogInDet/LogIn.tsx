// pages/LoginPage.tsx
import React, { useState } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import { useLocation } from "wouter";




const LoginPageDet: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, setLocation] = useLocation();
    const handleLogin = () => {

        setLocation("/Starter");
        console.log({ username, password });


    };


    return (
        <div className="min-h-screen  flex items-center justify-center">
            <div className=" p-8 rounded-2xl shadow-md w-80 text-center">
                <h2 className="text-white text-lg font-semibold mb-6">Input details</h2>
                <InputField
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button

                    onClick={handleLogin}
                    className="bg-green-500 text-white px-6 py-2 rounded-full mt-2 hover:bg-green-600 transition"
                >
                    Go
                </button>

        </div>
</div>
)
    ;
};

export default LoginPageDet;
