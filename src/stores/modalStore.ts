import { ModalType } from "@/types/modal";
import { create } from "zustand";

interface ModalStore {
  openModal: ModalType | undefined;
  setOpenModal: (modal: ModalType) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: undefined,
  setOpenModal: (modal: ModalType) => set({ openModal: modal }),
}));