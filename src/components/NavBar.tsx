import React, { useState } from 'react';
import { Link } from "wouter";
import Spline from '@splinetool/react-spline';
import SplineHome from "./Spline/SplineHome.tsx";
import SplineAbout from "./Spline/SplineAbout.tsx";
import SplineMenuIcon from "./Spline/SplineMenuIcon.tsx";
import SplineProfile from "./Spline/SplineProfile.tsx";
import SplineFriends from "./Spline/SplineFriends.tsx";
import './NavBar.css';
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            {/* Spline Menu Icon Button */}
            <button
                className="spline-menu-button"
                onClick={toggleMenu}
                aria-label="Toggle navigation menu"
            >
                <SplineMenuIcon isOpen={isOpen} />
            </button>

            {/* Navigation Links */}
            <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                <Link href="/starter" className="nav-link" onClick={() => setIsOpen(false)}>
                    <SplineHome/>
                </Link>
                <Link href="/about" className="nav-link" onClick={() => setIsOpen(false)}>
                    <SplineAbout/>
                </Link>
                <Link href="/friends" className="nav-link" onClick={() => setIsOpen(false)}>
                    <SplineFriends/>
                </Link>
                <Link href="/profile" className="nav-link" onClick={() => setIsOpen(false)}>
                    <SplineProfile/>
                </Link>
            </div>

            {/* Overlay for mobile menu */}
            {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)}></div>}


        </nav>
    );
}