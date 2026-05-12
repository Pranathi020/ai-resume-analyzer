"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Analysis, ViewName } from "./types";

const STORAGE_KEY = "ai-resume-analyzer:v1";

type Persisted = {
  history: Analysis[];
  currentId: string | null;
};

type StoreCtx = {
  ready: boolean;
  view: ViewName;
  setView: (v: ViewName) => void;
  history: Analysis[];
  current: Analysis | null;
  addAnalysis: (a: Analysis) => void;
  selectAnalysis: (id: string) => void;
  removeAnalysis: (id: string) => void;
  clearHistory: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<ViewName>("Dashboard");
  const [history, setHistory] = useState<Analysis[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Persisted;
        if (Array.isArray(data.history)) setHistory(data.history);
        if (data.currentId) setCurrentId(data.currentId);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      const payload: Persisted = { history, currentId };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {}
  }, [history, currentId, ready]);

  const addAnalysis = useCallback((a: Analysis) => {
    setHistory((h) => [a, ...h].slice(0, 30));
    setCurrentId(a.id);
  }, []);

  const selectAnalysis = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  const removeAnalysis = useCallback((id: string) => {
    setHistory((h) => h.filter((a) => a.id !== id));
    setCurrentId((c) => (c === id ? null : c));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentId(null);
  }, []);

  const current = useMemo(
    () => history.find((a) => a.id === currentId) ?? history[0] ?? null,
    [history, currentId],
  );

  const value: StoreCtx = {
    ready,
    view,
    setView,
    history,
    current,
    addAnalysis,
    selectAnalysis,
    removeAnalysis,
    clearHistory,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
