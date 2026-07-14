import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProgressStore = create(
  persist((set, get) => ({
    xp: 0,
    streakDays: 0,
    lastCompletedDate: null,
    badges: [],
    coins: 0,
    muted: false,
    voiceEnabled: true,
    voiceRate: 0.85,

    addXP: (amount) => set((s) => ({ xp: s.xp + amount })),
    addBadge: (id) =>
      set((s) => ({
        badges: s.badges.includes(id) ? s.badges : [...s.badges, id],
      })),
    incrementStreak: (dateStr) =>
      set((s) => ({
        streakDays: s.streakDays + 1,
        lastCompletedDate: dateStr || new Date().toISOString(),
      })),
    addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),
    setMuted: (v) => set(() => ({ muted: v })),
    toggleVoice: () => set((s) => ({ voiceEnabled: !s.voiceEnabled })),
    setVoiceRate: (rate) => set(() => ({ voiceRate: rate })),
  })),
  {
    name: "ai2030-progress",
  },
);

export default useProgressStore;
