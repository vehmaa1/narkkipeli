"use client";
import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClear: () => void;
  onClose: () => void;
}

export function Leaderboard({ entries, onClear, onClose }: LeaderboardProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap');
        .lb-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.88);
          z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          backdrop-filter: blur(4px);
        }
        .lb-panel {
          background: #0f0e0c;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 32px;
          width: 100%; max-width: 460px;
          max-height: 85vh; overflow-y: auto;
          font-family: 'IBM Plex Mono', monospace;
        }
        .lb-header {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding-bottom: 16px;
        }
        .lb-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 38px; letter-spacing: 2px; color: #e8e0d0;
        }
        .lb-close {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase;
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: #555; padding: 6px 12px; cursor: pointer;
          transition: all 0.15s;
        }
        .lb-close:hover { color: #e8e0d0; border-color: rgba(255,255,255,0.3); }
        .lb-empty {
          font-size: 11px; letter-spacing: 2px; color: #333;
          text-transform: uppercase; text-align: center; padding: 24px 0;
        }
        .lb-row {
          display: grid; grid-template-columns: 28px 1fr auto;
          gap: 16px; align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .lb-row:first-child { border-top: 1px solid rgba(255,255,255,0.04); }
        .lb-rank {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; color: #333; line-height: 1;
        }
        .lb-rank-gold { color: #c8924a; }
        .lb-rank-silver { color: #777; }
        .lb-rank-bronze { color: #7a5230; }
        .lb-name {
          font-size: 13px; font-weight: 700; color: #e8e0d0;
          letter-spacing: 1px; margin-bottom: 2px;
        }
        .lb-meta {
          font-size: 10px; color: #333; letter-spacing: 1px; text-transform: uppercase;
        }
        .lb-score {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px; color: #c8924a; letter-spacing: 1px;
        }
        .lb-footer {
          display: flex; justify-content: flex-end; margin-top: 20px;
        }
        .lb-clear {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase;
          background: transparent; border: 1px solid rgba(255,255,255,0.07);
          color: #333; padding: 7px 14px; cursor: pointer;
          transition: all 0.15s;
        }
        .lb-clear:hover { color: #e84040; border-color: #e84040; }
      `}</style>
      <div className="lb-overlay">
        <div className="lb-panel">
          <div className="lb-header">
            <div className="lb-title">Tulokset</div>
            <button className="lb-close" onClick={onClose}>Sulje ×</button>
          </div>
          {entries.length === 0 ? (
            <div className="lb-empty">// ei tuloksia vielä</div>
          ) : (
            entries.map((entry, i) => (
              <div className="lb-row" key={i}>
                <div className={`lb-rank ${i === 0 ? "lb-rank-gold" : i === 1 ? "lb-rank-silver" : i === 2 ? "lb-rank-bronze" : ""}`}>
                  {i + 1}
                </div>
                <div>
                  <div className="lb-name">{entry.name}</div>
                  <div className="lb-meta">{entry.topTier} · {new Date(entry.date).toLocaleDateString("fi-FI")}</div>
                </div>
                <div className="lb-score">{entry.score.toLocaleString()}</div>
              </div>
            ))
          )}
          <div className="lb-footer">
            <button className="lb-clear" onClick={onClear}>Tyhjennä lista</button>
          </div>
        </div>
      </div>
    </>
  );
}