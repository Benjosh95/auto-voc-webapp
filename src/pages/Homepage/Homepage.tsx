import React from 'react';
import {Navbar} from '../../components/Navbar';
import {Footer} from '../../components/Footer';
import './Homepage.css';
import VocabularyTrainer from '../../components/VocabularyTrainer/VocabularyTrainer';

export const Homepage: React.FC = () => {
    return (
        <div className="homepage-container">
            <Navbar />
            <main className="homepage-main-content">
                <VocabularyTrainer/>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;
