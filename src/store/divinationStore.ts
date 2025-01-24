import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { DivinationResult, DivinationRecord } from '../types/divination';

interface DivinationState {
  currentResult: DivinationResult | null;
  records: DivinationRecord[];
  setDivinationResult: (result: DivinationResult) => void;
  addDivinationRecord: (record: DivinationRecord) => void;
  deleteRecord: (id: string) => void;
  clearAllRecords: () => void;
  getRecords: () => DivinationRecord[];
}

export const useDivinationStore = create<DivinationState>()(
  persist(
    (set, get) => ({
      currentResult: null,
      records: [],
      
      setDivinationResult: (result: DivinationResult) => {
        set({ currentResult: result });
      },
      
      addDivinationRecord: (record: DivinationRecord) => {
        set((state) => ({
          records: [record, ...state.records]
        }));
      },

      deleteRecord: (id: string) => {
        set((state) => ({
          records: state.records.filter(record => record.id !== id)
        }));
      },

      clearAllRecords: () => {
        set({ records: [], currentResult: null });
      },
      
      getRecords: () => {
        return get().records;
      }
    }),
    {
      name: 'divination-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        records: state.records,
        currentResult: state.currentResult 
      }),
    }
  )
); 