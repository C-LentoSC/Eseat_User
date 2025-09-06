import { create } from 'zustand';

type AppStore = {
    mode: string;
    mobile: number;
    fee: number;
    // Setter
    setMode: (value: string) => void;
    setMobile: (value: number) => void;
    setFee: (value: number) => void;
    // Getter
    getMode: () => string;
    getMobile: () => number;
    getFee: () => number;
};

export const useAppStore = create<AppStore>((set, get) => ({
    mode: '', // default value
    mobile: 0, // default value
    fee: 0, // default value

    setMode: (value: string) =>
        set({ mode: value }),
    getMode: () => get().mode,
    setMobile: (value: number) =>
        set({ mobile: value }),
    getMobile: () => get().mobile,
    setFee: (value: number) =>
        set({ fee: value }),
    getFee: () => get().fee,
}));