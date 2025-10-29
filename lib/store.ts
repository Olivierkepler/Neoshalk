import { create } from "zustand";
import type { Slide } from "./slideGenerator";

interface AppState {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  slides: [],
  setSlides: (slides) => set({ slides }),
}));
