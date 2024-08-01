import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import './Layout.css';

export const Layout: React.FC = () => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="layout-main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
