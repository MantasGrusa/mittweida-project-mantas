import { Link } from "wouter";
import "./Navbar.css";
import SplineHome from "./Spline/SplineHome.tsx";
import SplineAbout from "./Spline/SplineAbout.tsx";

export default function NavBar() {
    return (
        <nav className="navbar">
            <Link href="/starter" className="nav-link">
                <SplineHome/>
            </Link>
            <Link href="/about" className="nav-link">
                <SplineAbout/>
            </Link>
        </nav>
    );
}