"use client";
import { motion } from "framer-motion";
import { TierItem } from "@/lib/types";

interface TileProps {
  tierId: number; row: number; col: number;
  gridSize: number; tiers: TierItem[]; isNew?: boolean;
}

const GAP = 8;

export function Tile({ tierId, row, col, gridSize, tiers, isNew }: TileProps) {
  const tier = tiers.find(t => t.id === tierId) ?? tiers[0];
  const cellSize = `calc((100% - ${(gridSize + 1) * GAP}px) / ${gridSize})`;

  return (
    <motion.div
      layout
      initial={isNew ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        position: "absolute",
        width: cellSize, height: cellSize,
        top: `calc(${GAP}px + ${row} * (${cellSize} + ${GAP}px))`,
        left: `calc(${GAP}px + ${col} * (${cellSize} + ${GAP}px))`,
        backgroundColor: tier.color, borderRadius: 8,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        overflow: "hidden", userSelect: "none",
      }}
    >
      {tier.image
        ? <img src={tier.image} alt={tier.name} style={{ width: "75%", height: "75%", objectFit: "contain", borderRadius: 4 }} />
        : <span style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}>{tier.name}</span>
      }
      <span style={{
        fontSize: "clamp(0.5rem, 1.2vw, 0.75rem)", color: tier.textColor,
        fontWeight: 700, marginTop: 2, textAlign: "center", padding: "0 4px", lineHeight: 1.1,
      }}>
        {tier.name}
      </span>
    </motion.div>
  );
}