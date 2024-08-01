import React, { useState } from 'react';
import { useDeleteVoc, useVocs } from '../../hooks/vocHooks'; 
import './Trainer.css';
import { RiDeleteBin6Line } from "react-icons/ri";

export const Trainer: React.FC = () => {
    const { data: vocs, isLoading, isError, error } = useVocs();
    const deleteVoc = useDeleteVoc();
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Handle keydown for navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowRight') {
            handleNextCard();
        } else if (event.key === 'ArrowLeft') {
            handlePreviousCard();
        }
    };

    // Navigate to the next card
    const handleNextCard = () => {
        if (!vocs) return;
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vocs.length);
        setIsFlipped(false);
    };

    // Navigate to the previous card
    const handlePreviousCard = () => {
        if (!vocs) return;
        setIsFlipped(false);
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? vocs.length - 1 : prevIndex - 1
        );
        setIsFlipped(false);
    };

    // Flip the card on click
    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    // Handle delete card
    const handleDeleteCard = () => {
        if (!vocs) return;
        const vocId = vocs[currentIndex].id;
        deleteVoc.mutate(vocId, {
            onSuccess: () => {
                // Optionally, remove the deleted card from the local state
                // const updatedVocs = vocs.filter((_, index) => index !== currentIndex);
                // setVocs(updatedVocs);
                setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
            },
        });
    };

    // Render loading state, error state, or the cards
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

    if (!vocs || vocs.length === 0) return <div>No vocabulary data available</div>;

    return (
        <div className="trainer" tabIndex={0} onKeyDown={handleKeyDown}>
            <button className="nav-button left" onClick={handlePreviousCard}>&lt;</button>
            <div className="card-container">
                <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
                    <div className="card-front">
                        {vocs[currentIndex].english}
                    </div>
                    <div className="card-back">
                        {vocs[currentIndex].german}
                    </div>
                </div>
                <div className="card-utils">
                    <div className="card-counter">
                        Cards {currentIndex + 1} / {vocs.length}
                    </div>
                    <RiDeleteBin6Line className="card-delete-icon" onClick={handleDeleteCard}/>
                </div>
            </div>
            <button className="nav-button right" onClick={handleNextCard}>&gt;</button>
        </div>
    );
};

export default Trainer;
