import { Region } from "@/types/region";
import { create } from "zustand";

interface RegionStore {
    selectedRegion: Region | undefined;
    setSelectedRegion: (region: Region | undefined) => void;
}

export const useRegionsStore = create<RegionStore>((set) => ({
    selectedRegion: undefined,
    setSelectedRegion: (region: Region | undefined) => set({ selectedRegion: region }),
}));