import React from "react";
import Button from "../../components/Button/Button.tsx";
import { useLocation } from "wouter";
import "./Button.css";

const LoginSignUpPage: React.FC = () => {
    const [, setLocation] = useLocation();

    const goToSignUp = () => setLocation('/signupdet');
    const goToLogIn = () => setLocation('/logindet');

    return (
        <div className="button-container">
            <div className="flex flex-col gap-6 items-center w-full max-w-md px-4">
                <Button className="SignUpbutton" onClick={goToSignUp}>
                    Sign up
                </Button>
                <Button className="LogInbutton" onClick={goToLogIn}>
                    Log in
                </Button>
            </div>
        </div>

    );
};

export default LoginSignUpPage;
