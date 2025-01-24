import React from 'react';
import { Symbol } from '../64symbols';
import styles from './SymbolModal.module.css';

interface SymbolModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: Symbol | null;
}

export const SymbolModal: React.FC<SymbolModalProps> = ({ isOpen, onClose, symbol }) => {
  if (!isOpen || !symbol) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>
            <span className={styles.character}>{symbol.character}</span>
            {symbol.name}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <h3>卦辞</h3>
            <p>{symbol.description}</p>
          </div>
          {symbol.detail && (
            <div className={styles.section}>
              <h3>详解</h3>
              {symbol.detail.split('\r\n\r\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 