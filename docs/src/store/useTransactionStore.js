import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  transactions: [],
  
  setTransactions: (data) => set({ transactions: data }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [tx, ...state.transactions],
    })),
}));