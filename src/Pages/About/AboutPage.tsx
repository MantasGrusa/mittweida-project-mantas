import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.tsx";

const About: React.FC = () => {
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + fullText[currentIndex]);
            currentIndex++;
            if (currentIndex >= fullText.length) clearInterval(interval);
        }, 30); // typing speed (ms)

        return () => clearInterval(interval);
    }, []);

    return (


        <>
            <NavBar/>
            <div className="flex justify-center items-center min-h-screen  p-4">
                <div className=" p-8 rounded-lg shadow-lg max-w-3xl">
                    <h1 className="text-3xl font-bold mb-4">Welcome to the About page</h1>
                    <p>{displayedText}</p>
                </div>
            </div>
        </>
    );
};

export default About;
