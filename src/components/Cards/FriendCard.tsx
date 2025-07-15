import React from "react";

interface FriendCardProps {
    name: string;
    onChallenge: () => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ name, onChallenge }) => {
    return (
        <div className="flex items-center justify-between bg-green-500 rounded-full px-4 py-2 mb-3 text-white w-full max-w-[280px]">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white rounded-full text-green-600 flex items-center justify-center text-sm font-bold">
                    👤
                </div>
                <span>{name}</span>
            </div>
            <button
                onClick={onChallenge}
                className="bg-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-800 transition"
            >
                Challenge
            </button>
        </div>
    );
};

export default FriendCard;