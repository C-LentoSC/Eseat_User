import { create } from 'zustand';

type AppStore = {
    mode: string;
    // Setter
    setMode: (value: string) => void;
    // Getter
    getMode: () => string;
};

export const useAppStore = create<AppStore>((set, get) => ({
    mode: '', // default value

    setMode: (value: string) =>
        set({ mode: value }),
    getMode: () => get().mode,
}));