// pages/SecondPage.tsx (or just App.tsx if it's SPA)
import React, { useState } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import { useLocation } from "wouter";
import "./signup.css";
import {API_BASE_URL} from "../../config.ts";

const SignUpPageDet: React.FC = () => {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [, setLocation] = useLocation();

    const handleSubmit = async () => {
        if (!Username || !Email || !Password) {
            setError("Please fill in all fields");
            return;
        }

        if (Password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: Username,
                    email: Email,
                    password: Password
                })
            });

            if (response.ok) {
                const userData = await response.json();
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                setLocation("/Starter");
                console.log('Signup successful:', userData);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Signup failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Signup error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#003321] to-[#001a11] flex items-center justify-center">
            <div className="bg-[#002619] p-8 rounded-2xl shadow-md w-80 text-center">
                <h2 className="text-white text-lg font-semibold mb-6">Input more details</h2>

                {error && (
                    <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded">
                        {error}
                    </div>
                )}

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
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="text-white px-6 py-2 rounded-full mt-2 hover:bg-green-600 transition disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Continue"}
                </button>
            </div>
        </div>
    );
};

export default SignUpPageDet;