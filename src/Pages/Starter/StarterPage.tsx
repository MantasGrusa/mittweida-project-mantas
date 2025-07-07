import { useLocation } from "wouter";
import StarterButton from "../../components/Button/StarterButton.tsx";
import NavBar from "../../components/NavBar.tsx";

export default function StarterPage(){
    const [, setLocation] = useLocation();
    console.log("StarterPage component is rendering!");

    const handleStartExploring = () => {
        setLocation('/selection-cat');
    };

    return(
        <div style={{
            position: 'relative', // Changed from 'fixed'
            minHeight: '100vh',   // Changed from fixed height
            background: 'transparent', // Changed from 'black'
            color: 'white',
            zIndex: 10,          // Much lower z-index
            padding: '20px'
        }}>
            <StarterButton onClick={handleStartExploring}/>
            <NavBar/>
        </div>
    )
}