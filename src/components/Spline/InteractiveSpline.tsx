import { useEffect } from "react";
import Spline from '@splinetool/react-spline';

interface InteractiveSplineProps {
    scene: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function InteractiveSpline({
                                              scene,
                                              onClick,
                                              className = "w-full h-full cursor-pointer",
                                              style = { cursor: "pointer !important" }
                                          }: InteractiveSplineProps) {

    // Force cursor style on Spline canvas
    useEffect(() => {
        const handleMouseMove = () => {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                canvas.style.cursor = 'pointer !important';
            });
        };

        // Set cursor immediately and on mouse move
        const interval = setInterval(() => {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach(canvas => {
                canvas.style.cursor = 'pointer';
                canvas.style.setProperty('cursor', 'pointer', 'important');
            });
        }, 100);

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearInterval(interval);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.cursor = 'pointer';
        // Force cursor on any canvas elements
        const canvases = e.currentTarget.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            (canvas as HTMLElement).style.cursor = 'pointer';
        });
    };

    return (
        <div
            className={`cursor-pointer ${className}`}
            style={{ cursor: "pointer !important", ...style }}
            onMouseEnter={handleMouseEnter}
        >
            <Spline
                onClick={onClick}
                scene={scene}
                className="w-full h-full cursor-pointer"
                style={{ cursor: "pointer !important" }}
            />
        </div>
    );
}