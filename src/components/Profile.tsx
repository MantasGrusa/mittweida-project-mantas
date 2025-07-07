import type { FC } from "react";

interface ProfileProps {
    name: string;
    age: number;
    imageUrl: string;
}

const Profile: FC<ProfileProps> = ({ name, age, imageUrl }) => {
    const handleClick = () => {
        alert(`You clicked on the profile of ${name}!`);
    };

    return (
        <div className={"card"}>
            <img src={imageUrl} alt="Profile" />
            <h3>{name}</h3>
            <p>Age: {age}</p>
            {age < 18 && <p>Underage</p>}
            <button onClick={handleClick}>Click me</button>
        </div>
    );
};

export default Profile;