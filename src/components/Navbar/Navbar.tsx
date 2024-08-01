import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { IoIosStar } from "react-icons/io";


export const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo-container">
                    autovoc 
                    <IoIosStar className="navbar-logo"/>
                </Link>
                <ul className="navbar-links">
                    <li><Link to="/trainer">Trainer</Link></li>
                    <li><Link to="/learned">Learned</Link></li> 
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;