"use client";
import { useState, useEffect, useCallback } from "react";
import { Board } from "@/components/Board";
import { Leaderboard } from "@/components/Leaderboard";
import { ScoreModal } from "@/components/ScoreModal";
import { DEFAULT_TIERS } from "@/lib/types";
import { useGame } from "@/lib/useGame";
import { useLeaderboard } from "@/lib/useLeaderboard";

export default function GamePage() {
  const tiers = DEFAULT_TIERS;
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [scoreModalShown, setScoreModalShown] = useState(false);

  const { cells, score, gameOver, won, katkoUsed, gridSize, handleMove, startGame, useKatkohoito } = useGame(tiers);
  const { entries, bestScore, addEntry, clearLeaderboard } = useLeaderboard();

  useEffect(() => {
    if ((gameOver || won) && !scoreModalShown && cells.length > 0) {
      setShowScoreModal(true);
      setScoreModalShown(true);
    }
  }, [gameOver, won, scoreModalShown, cells.length]);

  const handleNewGame = useCallback(() => {
    startGame();
    setScoreModalShown(false);
    setShowScoreModal(false);
  }, [startGame]);

  const handleSubmitScore = useCallback((name: string) => {
    const maxTierId = Math.max(...cells.map(c => c.tierId));
    const topTier = tiers.find(t => t.id === maxTierId);
    addEntry({ name, score, topTier: topTier ? topTier.name : "?", date: new Date().toISOString() });
    setShowScoreModal(false);
  }, [cells, tiers, score, addEntry]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background-color: #0f0e0c;
          color: #e8e0d0;
        }

        .game-root {
          min-height: 100vh;
          background-color: #0f0e0c;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 16px 48px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .game-wrap { width: 100%; max-width: 500px; }

        .header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 16px;
        }

        .title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 12vw, 80px);
          letter-spacing: 2px;
          line-height: 0.9;
          color: #e8e0d0;
        }

        .title span {
          display: block;
          font-family: 'IBM Plex Mono', monospace;
          font-size: clamp(9px, 2vw, 11px);
          letter-spacing: 4px;
          color: #c8924a;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .scores {
          display: flex;
          gap: 2px;
        }

        .score-box {
          background: #1a1815;
          border: 1px solid rgba(255,255,255,0.07);
          padding: 8px 14px;
          text-align: right;
          min-width: 90px;
        }

        .score-label {
          font-size: 8px;
          letter-spacing: 3px;
          color: #666;
          text-transform: uppercase;
          font-weight: 700;
          display: block;
          margin-bottom: 3px;
        }

        .score-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: #c8924a;
          letter-spacing: 1px;
          line-height: 1;
        }

        .controls {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .btn {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 9px 16px;
          border: 1px solid rgba(255,255,255,0.12);
          background: #1a1815;
          color: #e8e0d0;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }

        .btn:hover { background: #252220; border-color: rgba(255,255,255,0.25); }

        .btn-katko {
          border-color: #c8924a;
          color: #c8924a;
        }

        .btn-katko:hover { background: #c8924a; color: #0f0e0c; }

        .btn-katko:disabled {
          border-color: rgba(255,255,255,0.07);
          color: #333;
          cursor: default;
          background: #1a1815;
        }

        .btn-scores {
          border-color: rgba(255,255,255,0.2);
          color: #e8e0d0;
          margin-left: auto;
        }

        .btn-scores:hover { background: #e8e0d0; color: #0f0e0c; }

        .tier-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 14px;
        }

        .tier-pill {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 3px 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: opacity 0.2s;
          text-transform: uppercase;
        }

        .tier-pill img {
          width: 13px;
          height: 13px;
          object-fit: contain;
        }

        .hint {
          font-size: 10px;
          letter-spacing: 2px;
          color: #333;
          text-transform: uppercase;
          margin-top: 20px;
          text-align: center;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 16px 0;
        }
      `}</style>

      <main className="game-root">
        <div className="game-wrap">
          {/* Header */}
          <div className="header">
            <div className="title">
              <span>yhdistä &amp; juo</span>
              Narkkipeli
            </div>
            <div className="scores">
              <div className="score-box">
                <span className="score-label">Pisteet</span>
                <span className="score-value">{score.toLocaleString()}</span>
              </div>
              <div className="score-box">
                <span className="score-label">Paras</span>
                <span className="score-value">{bestScore.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button className="btn" onClick={handleNewGame}>↺ Uusi peli</button>
            <button
              className="btn btn-katko"
              onClick={() => { if (!katkoUsed) useKatkohoito(); }}
              disabled={katkoUsed}
            >
              {katkoUsed ? "✓ Katkohoito" : "+ Katkohoito"}
            </button>
            <button className="btn btn-scores" onClick={() => setShowLeaderboard(true)}>
              — Tulokset
            </button>
          </div>

          {/* Board */}
          <Board cells={cells} gridSize={gridSize} tiers={tiers} onMove={handleMove} />

          <div className="divider" />

          {/* Tier legend */}
          <div className="tier-legend">
            {tiers.map(tier => (
              <div
                key={tier.id}
                className="tier-pill"
                style={{
                  backgroundColor: tier.color,
                  color: tier.textColor,
                  opacity: cells.some(c => c.tierId === tier.id) ? 1 : 0.25,
                }}
              >
                <img src={tier.image} alt="" />
                {tier.name}
              </div>
            ))}
          </div>

          <p className="hint">Nuolinäppäimet · WASD · Pyyhkäise</p>
        </div>
      </main>

      {showLeaderboard && (
        <Leaderboard entries={entries} onClear={clearLeaderboard} onClose={() => setShowLeaderboard(false)} />
      )}
      {showScoreModal && (
        <ScoreModal score={score} cells={cells} tiers={tiers} won={won} onSubmit={handleSubmitScore} onClose={() => setShowScoreModal(false)} />
      )}
    </>
  );
}