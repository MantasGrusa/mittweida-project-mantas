import React, { useState, useEffect } from "react";
import InputField from "../../components/Input/InputFieldDetails.tsx";
import FriendCard from "../../components/Cards/FriendCard.tsx";
import NavBar from "../../components/NavBar.tsx";

interface User {
    id: string;
    username: string;
    email: string;
}

interface Friend {
    userId: string;
    friendId: string;
    friendUsername: string;
    addedAt: string;
}

const FriendsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [friends, setFriends] = useState<Friend[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingFriend, setAddingFriend] = useState(false);

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const fetchFriends = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/users/friends/${user.id}`);

                if (response.ok) {
                    const friendsData = await response.json();
                    setFriends(friendsData);
                } else {
                    console.error('Failed to fetch friends');
                }
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchFriends();
        }
    }, [user]);

    const handleAddFriend = async () => {
        if (!user || !searchTerm.trim() || addingFriend) return;

        setAddingFriend(true);

        try {
            const response = await fetch(`http://localhost:3000/users/friends/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: searchTerm.trim()
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Add the new friend to the list
                setFriends(prev => [...prev, result.friend]);
                setSearchTerm(""); // Clear search
                alert(`✅ ${result.message}`);
            } else {
                alert(`❌ ${result.message}`);
            }
        } catch (error) {
            alert('❌ Network error. Please try again.');
            console.error('Add friend error:', error);
        } finally {
            setAddingFriend(false);
        }
    };

    const handleChallenge = async (friend: Friend) => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:3000/users/friends/challenge/${user.id}/${friend.friendId}`, {
                method: 'POST',
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show success popup
                alert(`🏆 ${result.message}`);
            } else {
                alert(`❌ ${result.message}`);
            }
        } catch (error) {
            alert('❌ Network error. Please try again.');
            console.error('Challenge friend error:', error);
        }
    };

    const handleRemove = async (friend: Friend) => {
        if (!user) return;

        const confirmRemove = window.confirm(
            `Are you sure you want to remove ${friend.friendUsername} from your friends?`
        );

        if (!confirmRemove) return;

        try {
            const response = await fetch(`http://localhost:3000/users/friends/${user.id}/${friend.friendId}`, {
                method: 'DELETE',
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Remove friend from the list
                setFriends(prev => prev.filter(f => f.friendId !== friend.friendId));
                alert(`✅ ${result.message}`);
            } else {
                alert(`❌ ${result.message}`);
            }
        } catch (error) {
            alert('❌ Network error. Please try again.');
            console.error('Remove friend error:', error);
        }
    };

    if (!user) {
        return (
            <>
                <NavBar/>
                <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Please Log In</h2>
                        <p>You need to be logged in to view your friends.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar/>
            <div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4 text-white">
                {/* Add Friends Search Bar */}
                <div className="relative w-full max-w-[280px] mb-6">
                    <InputField
                        placeholder="Add friends by username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleAddFriend}
                        disabled={!searchTerm.trim() || addingFriend}
                        className="absolute right-3 top-2.5 text-green-800 text-xl hover:text-green-600 disabled:opacity-50"
                    >
                        {addingFriend ? "⏳" : "➕"}
                    </button>
                </div>

                {/* Friends List */}
                <div className="bg-[#002619] rounded-2xl px-6 py-4 w-full max-w-[300px] shadow-md">
                    <h2 className="text-white text-lg font-semibold mb-4">
                        Your friends ({friends.length})
                    </h2>

                    {loading ? (
                        <div className="text-center text-gray-400 py-4">
                            Loading friends...
                        </div>
                    ) : friends.length === 0 ? (
                        <div className="text-center text-gray-400 py-4">
                            <p>No friends yet!</p>
                            <p className="text-sm mt-2">Add friends by searching their username above.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {friends.map((friend) => (
                                <FriendCard
                                    key={friend.friendId}
                                    name={friend.friendUsername}
                                    onClick={() => handleChallenge(friend)}
                                    onRemove={() => handleRemove(friend)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-6 text-center text-gray-400 text-sm max-w-[280px]">
                    <p>💡 Add friends by typing their exact username</p>
                    <p>🏆 Challenge friends to compete in the game</p>
                    <p>❌ Remove friends you no longer want to see</p>
                </div>
            </div>
        </>
    );
};

export default FriendsPage;