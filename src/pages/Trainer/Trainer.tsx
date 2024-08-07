import React, { useState, useEffect } from 'react';
import { useDeleteVoc, useUpdateVoc, useVocs } from '../../hooks/vocHooks';
import './Trainer.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Voc } from '../../types/Voc';
import { updateVocStatus } from './trainerUtility';

export const Trainer: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const { data: fetchedVocs, isLoading, isError, error } = useVocs({ nextReviewDate: today });
  const deleteVoc = useDeleteVoc();
  const updateVoc = useUpdateVoc();
  
  const [vocs, setVocs] = useState<Voc[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (fetchedVocs) {
        setVocs(fetchedVocs)
    }
  }, [fetchedVocs]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      handleNextVoc();
    } else if (event.key === 'ArrowLeft') {
      handlePreviousVoc();
    }
  };

  const handleNextVoc = () => {
    if (!vocs.length) return;
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocs.length);
  };

  const handlePreviousVoc = () => {
    if (!vocs.length) return;
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? vocs.length - 1 : prevIndex - 1
    );
  };

  const handleVocClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePerformance = (performance: 'good' | 'medium' | 'bad') => {
    if (!vocs.length) return;
    const updatedVoc = updateVocStatus(vocs[currentIndex], performance);
    updateVoc.mutate(
      { id: updatedVoc.id, voc: updatedVoc },
      {
        onSuccess: (updatedVoc) => {
          // Reapply the filter after updating the vocabulary
          const updatedVocs = vocs.map((voc, index) =>
            index === currentIndex ? updatedVoc : voc
          );
          setVocs(updatedVocs);
          handleNextVoc();
        },
        onError: (error) => {
          console.error('Error updating vocabulary:', error);
        },
      }
    );
  };

  const handleDeleteVoc = () => {
    if (!vocs.length) return;
    const vocId = vocs[currentIndex].id;
    deleteVoc.mutate(vocId, {
      onSuccess: () => {
        const updatedVocs = vocs.filter((_, index) => index !== currentIndex);
        setVocs(updatedVocs);
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  if (!vocs.length) return <div>No vocabulary data available</div>;

  return (
    <div className="trainer" tabIndex={0} onKeyDown={handleKeyDown}>
      <button className="nav-button left" onClick={handlePreviousVoc}>&lt;</button>
      <div className="card-container">
        <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleVocClick}>
          <div className="card-front">
            {vocs[currentIndex].english}
          </div>
          <div className="card-back">
            {vocs[currentIndex].german}
          </div>
        </div>
        <div className="card-utils">
          <div className="card-counter">
            Vocabularies {currentIndex + 1} / {vocs.length}
          </div>
          <RiDeleteBin6Line className="card-delete-icon" onClick={handleDeleteVoc}/>
        </div>
        <div className="performance-buttons">
          <button className="performance-button good" onClick={() => handlePerformance('good')}>Good</button>
          <button className="performance-button medium" onClick={() => handlePerformance('medium')}>Medium</button>
          <button className="performance-button bad" onClick={() => handlePerformance('bad')}>Bad</button>
        </div>
      </div>
      <button className="nav-button right" onClick={handleNextVoc}>&gt;</button>
    </div>
  );
};

export default Trainer;
