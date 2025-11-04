"use client";

import { create } from "zustand";

type TabStore = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  nextTab: (total: number) => void;
  prevTab: (total: number) => void;
};

export const useTabsStore = create<TabStore>((set, get) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
  nextTab: (total) =>
    set({ activeIndex: (get().activeIndex + 1) % total }),
  prevTab: (total) =>
    set({ activeIndex: (get().activeIndex - 1 + total) % total }),
}));
