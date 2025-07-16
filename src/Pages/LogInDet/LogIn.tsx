import React, { useState } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import { useLocation } from "wouter";
import Button from "../../components/Button/Button.tsx";

const LoginPageDet: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [, setLocation] = useLocation();

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                const userData = await response.json();
                // Store user data in localStorage for later use
                localStorage.setItem('user', JSON.stringify(userData));
                setLocation("/Starter");
                console.log('Login successful:', userData);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-2xl shadow-md w-80 text-center">
                <h2 className="text-white text-lg font-semibold mb-6">Input details</h2>

                {error && (
                    <div className="text-red-500 text-sm mb-4 p-2 bg-red-100 rounded">
                        {error}
                    </div>
                )}

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

                <Button
                    className="LogInbutton"
                    onClick={handleLogin}

                >
                    {loading ? "Logging in..." : "Log in"}
                </Button>
            </div>
        </div>
    );
};

export default LoginPageDet;