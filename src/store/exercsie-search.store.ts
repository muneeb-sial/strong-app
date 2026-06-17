import { create } from 'zustand';

interface ExerciseSearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useExerciseSearchStore = create<ExerciseSearchState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));