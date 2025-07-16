import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.tsx";

const About: React.FC = () => {
    const fullText = `Welcome to Explore Mittweida, a fun and interactive game-like app created by a student, for students! Whether you're just arriving in Mittweida for your Erasmus semester or already getting to know the town, this app is your perfect companion.

What is it?
Explore Mittweida is more than just a guide — it's a game-inspired experience that helps Erasmus students discover the best of what this small yet lively town has to offer. Complete challenges, unlock hidden spots, and connect with other international students as you explore your new home in a fun and engaging way.`;

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
