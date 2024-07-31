import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from '../../components/Footer';
import './Homepage.css';

export const Homepage: React.FC = () => {
    return (
        <div className="homepage-container">
            <Navbar />
            <main className="homepage-main-content">
                <h1>Welcome to MyApp</h1>
                <p>Your journey starts here. Explore our features and learn more about what we offer.</p>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;
