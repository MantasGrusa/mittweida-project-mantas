import { useLocation } from "wouter";
import InteractiveSpline from "./InteractiveSpline";

interface SplineLinkWrapperProps {
    href: string;
    scene: string;
    onClick?: () => void;
    className?: string;
}

export default function SplineLinkWrapper({
                                              href,
                                              scene,
                                              onClick,
                                              className = "fixed inset-0 z-10 cursor-pointer"
                                          }: SplineLinkWrapperProps) {
    const [, setLocation] = useLocation();

    const handleClick = (e?: React.MouseEvent) => {
        console.log("SplineLinkWrapper clicked"); // Debug log
        e?.preventDefault();
        e?.stopPropagation();

        onClick?.(); // Execute the removal callback

        // Navigate immediately instead of using setTimeout
        setLocation(href);
    };

    const handleSplineClick = () => {
        console.log("Spline component clicked"); // Debug log
        handleClick(); // Call without event object
    };

    return (
        <div className={className} onClick={handleClick}>
            <InteractiveSpline
                scene={scene}
                onClick={handleSplineClick} // Pass our handler to InteractiveSpline
            />
        </div>
    );
}