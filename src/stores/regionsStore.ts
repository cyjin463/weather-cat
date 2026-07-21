import { Region } from "@/types/region";
import { create } from "zustand";

interface RegionStore {
    selectedLocation: Region | undefined;
    setSelectedLocation: (location: Region | undefined) => void;
}

export const useRegionsStore = create<RegionStore>((set) => ({
    selectedLocation: undefined,
    setSelectedLocation: (location: Region | undefined) => set({ selectedLocation: location }),
}));