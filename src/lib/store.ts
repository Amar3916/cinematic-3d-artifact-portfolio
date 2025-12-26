import { create } from "zustand";

interface PortfolioState {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  currentPage: 0,
  totalPages: 9,
  nextPage: () => set((state) => ({ 
    currentPage: Math.min(state.currentPage + 1, state.totalPages - 1) 
  })),
  prevPage: () => set((state) => ({ 
    currentPage: Math.max(state.currentPage - 1, 0) 
  })),
  setPage: (page) => set({ currentPage: page }),
}));
