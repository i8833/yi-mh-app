import { useState, useCallback } from 'react';
import { Symbol, getSymbolsData } from '../64symbols';

export function useSymbols() {
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSymbolClick = useCallback((name: string) => {
    console.log('Clicking symbol:', name);
    const symbols = getSymbolsData();
    const symbol = symbols.find(s => s.name === name);
    console.log('Found symbol:', symbol);
    
    if (symbol) {
      setSelectedSymbol(symbol);
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSymbol(null);
  }, []);

  return {
    selectedSymbol,
    isModalOpen,
    handleSymbolClick,
    closeModal
  };
} 