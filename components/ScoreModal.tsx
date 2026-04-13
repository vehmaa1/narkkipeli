"use client";
import { useState } from "react";
import { TierItem } from "@/lib/types";

interface ScoreModalProps {
  score: number;
  cells: { tierId: number }[];
  tiers: TierItem[];
  onSubmit: (name: string) => void;
  onClose: () => void;
  won: boolean;
}

export function ScoreModal({ score, cells, tiers, onSubmit, onClose, won }: ScoreModalProps) {
  const [name, setName] = useState("");
  const maxTierId = Math.max(...cells.map(c => c.tierId));
  const topTier = tiers.find(t => t.id === maxTierId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap');
        .score-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.88);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          backdrop-filter: blur(4px);
        }
        .score-modal {
          background: #0f0e0c;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 40px 32px;
          width: 100%; max-width: 360px;
          font-family: 'IBM Plex Mono', monospace;
        }
        .score-modal-eyebrow {
          font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
          color: #555; margin-bottom: 8px;
        }
        .score-modal-headline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px; letter-spacing: 2px;
          color: ${won ? "#c8924a" : "#e8e0d0"};
          line-height: 1; margin-bottom: 24px;
        }
        .score-modal-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px; color: #c8924a; line-height: 1;
          border-top: 1px solid rgba(255,255,255,0.08);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 12px 0; margin-bottom: 16px;
        }
        .score-modal-top {
          font-size: 11px; color: #555; letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 24px;
        }
        .score-modal-top strong { color: #c8924a; }
        .score-modal-input {
          width: 100%; padding: 12px 0;
          background: transparent;
          border: none; border-bottom: 1px solid rgba(255,255,255,0.15);
          color: #e8e0d0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px; letter-spacing: 1px;
          outline: none; margin-bottom: 24px;
        }
        .score-modal-input::placeholder { color: #333; }
        .score-modal-input:focus { border-bottom-color: #c8924a; }
        .score-modal-btns { display: flex; gap: 8px; }
        .score-modal-btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 11px 16px; border: 1px solid rgba(255,255,255,0.12);
          background: transparent; color: #666;
          cursor: pointer; transition: all 0.15s;
        }
        .score-modal-btn:hover { color: #e8e0d0; border-color: rgba(255,255,255,0.3); }
        .score-modal-btn-primary {
          flex: 1; border-color: #c8924a; color: #c8924a;
        }
        .score-modal-btn-primary:hover { background: #c8924a; color: #0f0e0c; }
        .score-modal-btn-primary:disabled { border-color: #2a2825; color: #2a2825; cursor: default; background: transparent; }
      `}</style>
      <div className="score-modal-overlay">
        <div className="score-modal">
          <div className="score-modal-eyebrow">{ won ? "Huipputulos" : "Peli päättyi" }</div>
          <div className="score-modal-headline">{ won ? "Voitto." : "Game\nOver." }</div>
          <div className="score-modal-num">{score.toLocaleString()}</div>
          {topTier && (
            <div className="score-modal-top">
              Ylin tier — <strong>{topTier.name}</strong>
            </div>
          )}
          <input
            className="score-modal-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="// nimi tulostaulukkoon"
            maxLength={20}
            onKeyDown={e => { if (e.key === "Enter" && name.trim()) onSubmit(name.trim()); }}
          />
          <div className="score-modal-btns">
            <button className="score-modal-btn" onClick={onClose}>Ohita</button>
            <button
              className="score-modal-btn score-modal-btn-primary"
              onClick={() => { if (name.trim()) onSubmit(name.trim()); }}
              disabled={!name.trim()}
            >
              Tallenna →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}