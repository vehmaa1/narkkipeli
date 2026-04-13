"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { Cell, TierItem } from "./types";
import { addRandomCell, move, isGameOver, katkohoito } from "./gameLogic";

const GRID_SIZE = 5;

export function useGame(tiers: TierItem[]) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [katkoUsed, setKatkoUsed] = useState(false);
  const [gridSize] = useState(GRID_SIZE);
  const processingRef = useRef(false);

  const startGame = useCallback(() => {
    let c: Cell[] = [];
    c = addRandomCell(c, GRID_SIZE, tiers);
    c = addRandomCell(c, GRID_SIZE, tiers);
    setCells(c);
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKatkoUsed(false);
  }, [tiers]);

  useEffect(() => { startGame(); }, [startGame]);

  const handleMove = useCallback((direction: "up"|"down"|"left"|"right") => {
    if (gameOver || processingRef.current) return;
    processingRef.current = true;
    setCells(prev => {
      const { cells: moved, scoreDelta, moved: didMove } = move(prev, direction, gridSize, tiers);
      if (!didMove) { processingRef.current = false; return prev; }
      setScore(s => s + scoreDelta);
      const withNew = addRandomCell(moved, gridSize, tiers);
      if (withNew.some(c => c.tierId === tiers[tiers.length - 1].id)) setWon(true);
      if (isGameOver(withNew, gridSize, tiers)) setGameOver(true);
      processingRef.current = false;
      return withNew;
    });
  }, [gameOver, gridSize, tiers]);

  const useKatkohoito = useCallback(() => {
    if (katkoUsed) return;
    setCells(prev => katkohoito(prev, tiers));
    setKatkoUsed(true);
    setGameOver(false);
  }, [katkoUsed, tiers]);

  return { cells, score, gameOver, won, katkoUsed, gridSize, handleMove, startGame, useKatkohoito };
}