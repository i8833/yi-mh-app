import React from 'react';
import { useSymbols } from '../hooks/useSymbols';
import { SymbolModal } from './SymbolModal';
import styles from './SymbolDisplay.module.css';

interface SymbolDisplayProps {
  name: string;
  character: string;
}

export const SymbolDisplay: React.FC<SymbolDisplayProps> = ({ name, character }) => {
  const { selectedSymbol, isModalOpen, handleSymbolClick, closeModal } = useSymbols();

  const handleClick = () => {
    console.log('Clicking symbol:', name);
    handleSymbolClick(name);
  };

  return (
    <>
      <div 
        className={styles.symbolContainer} 
        onClick={handleClick}
      >
        <div className={styles.character}>{character}</div>
        <div className={styles.name}>{name}</div>
      </div>

      <SymbolModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        symbol={selectedSymbol}
      />
    </>
  );
}; 