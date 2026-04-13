"use client";
import { useState, useEffect, useCallback } from "react";
import { LeaderboardEntry } from "./types";

const STORAGE_KEY = "2048_leaderboard";
const BEST_SCORE_KEY = "2048_best_score";

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
      const best = localStorage.getItem(BEST_SCORE_KEY);
      if (best) setBestScore(parseInt(best, 10));
    } catch {}
  }, []);

  const addEntry = useCallback((entry: LeaderboardEntry) => {
    setEntries(prev => {
      const updated = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 20);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
    setBestScore(prev => {
      const next = Math.max(prev, entry.score);
      try { localStorage.setItem(BEST_SCORE_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const clearLeaderboard = useCallback(() => {
    setEntries([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return { entries, bestScore, addEntry, clearLeaderboard };
}