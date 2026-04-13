"use client";
import { useEffect, useRef } from "react";
import { Tile } from "./Tile";
import { Cell, TierItem } from "@/lib/types";

interface BoardProps {
  cells: Cell[]; gridSize: number; tiers: TierItem[];
  onMove: (dir: "up"|"down"|"left"|"right") => void;
}

export function Board({ cells, gridSize, tiers, onMove }: BoardProps) {
  const touchStart = useRef<{x: number; y: number} | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, "up"|"down"|"left"|"right"> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
      };
      if (map[e.key]) { e.preventDefault(); onMove(map[e.key]); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onMove]);

  const GAP = 8;
  return (
    <div
      onTouchStart={e => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={e => {
        if (!touchStart.current) return;
        const dx = e.changedTouches[0].clientX - touchStart.current.x;
        const dy = e.changedTouches[0].clientY - touchStart.current.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
        onMove(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
        touchStart.current = null;
      }}
      style={{
        position: "relative", width: "100%", aspectRatio: "1",
        backgroundColor: "#bbada0", borderRadius: 12, padding: GAP,
        boxSizing: "border-box", touchAction: "none", userSelect: "none",
      }}
    >
      {Array(gridSize * gridSize).fill(null).map((_, i) => {
        const r = Math.floor(i / gridSize), c = i % gridSize;
        const cellSize = `calc((100% - ${(gridSize + 1) * GAP}px) / ${gridSize})`;
        return (
          <div key={i} style={{
            position: "absolute", width: cellSize, height: cellSize,
            top: `calc(${GAP}px + ${r} * (${cellSize} + ${GAP}px))`,
            left: `calc(${GAP}px + ${c} * (${cellSize} + ${GAP}px))`,
            backgroundColor: "rgba(238,228,218,0.35)", borderRadius: 6,
          }} />
        );
      })}
      {cells.map(cell => (
        <Tile key={cell.id} tierId={cell.tierId} row={cell.row} col={cell.col}
          gridSize={gridSize} tiers={tiers} isNew={cell.isNew} />
      ))}
    </div>
  );
}