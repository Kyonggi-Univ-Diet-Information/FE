import { create } from "zustand";

export type Language = "ko" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => Language;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: "ko",
  setLanguage: (language: Language) => set({ language }),
  toggleLanguage: () => {
    const currentLanguage = get().language;
    const newLanguage = currentLanguage === "ko" ? "en" : "ko";
    set({ language: newLanguage });
    return newLanguage;
  },
}));
