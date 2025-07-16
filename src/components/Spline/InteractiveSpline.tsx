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
                // Add mobile-friendly styles
                canvas.style.touchAction = 'manipulation';
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

    // Handle both mouse and touch events with better mobile support
    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Prevent default touch behaviors
        console.log("🎮 Spline interaction triggered!");
        if (onClick) {
            onClick();
        }
    };

    // Handle touch events specifically
    const handleTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        console.log("📱 Touch end on Spline!");
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className={`cursor-pointer ${className}`}
            style={{
                cursor: "pointer !important",
                touchAction: "manipulation", // Prevents zoom and improves touch response
                WebkitTouchCallout: "none", // Prevents callout on iOS
                WebkitUserSelect: "none", // Prevents text selection
                userSelect: "none",
                ...style
            }}
            onMouseEnter={handleMouseEnter}
            onClick={handleInteraction}
            onTouchStart={(e) => {
                console.log("📱 Touch start on Spline!");
                e.preventDefault();
            }}
            onTouchEnd={handleTouchEnd}
        >
            <Spline
                scene={scene}
                className="w-full h-full cursor-pointer"
                style={{
                    cursor: "pointer !important",
                    touchAction: "manipulation", // Changed from "none" to "manipulation"
                    WebkitTouchCallout: "none",
                    WebkitUserSelect: "none",
                    userSelect: "none",
                    pointerEvents: "auto" // Ensure pointer events work
                }}
            />

            {/* Mobile fallback button - shows only on small screens */}
            <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log("📱 Fallback button clicked!");
                        if (onClick) onClick();
                    }}
                    className="pointer-events-auto bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all"
                    style={{
                        zIndex: 1000,
                        touchAction: "manipulation"
                    }}
                >
                    Tap to Continue
                </button>
            </div>
        </div>
    );
}