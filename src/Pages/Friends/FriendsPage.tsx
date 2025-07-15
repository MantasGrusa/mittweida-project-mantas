import React, { useState } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import FriendCard from "../../components/Cards/FriendCard.tsx";
import NavBar from "../../components/NavBar.tsx";

const FriendsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [friends] = useState(["Alice", "Bob", "Charlie", "Diana", "Eli"]);

    const handleChallenge = (name: string) => {
        console.log(`Challenged ${name}`);
    };

    return (

        <>
            <NavBar/>
            <div className="min-h-screen flex flex-col items-center justify-start pt-10  px-4 text-white">
                {/* Add Friends Search Bar */}
                <div className="relative w-full max-w-[280px] mb-6">
                    <InputField
                        placeholder="Add friends"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="absolute right-3 top-2.5 text-green-800 text-xl">
                        🔍
                    </button>
                </div>

                {/* Friends List */}
                <div className="bg-[#002619] rounded-2xl px-6 py-4 w-full max-w-[300px] shadow-md">
                    <h2 className="text-white text-lg font-semibold mb-4">Your friends</h2>
                    <div className="flex flex-col">
                        {friends.map((name) => (
                            <FriendCard
                                key={name}
                                name={name}
                                onChallenge={() => handleChallenge(name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default FriendsPage;