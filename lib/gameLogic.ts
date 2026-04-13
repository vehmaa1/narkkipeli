import { Cell, TierItem } from "./types";

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createGrid(size: number): (Cell | null)[][] {
  return Array(size).fill(null).map(() => Array(size).fill(null));
}

export function cellsToGrid(cells: Cell[], size: number): (Cell | null)[][] {
  const grid = createGrid(size);
  cells.forEach(cell => {
    if (cell.row >= 0 && cell.row < size && cell.col >= 0 && cell.col < size)
      grid[cell.row][cell.col] = cell;
  });
  return grid;
}

export function addRandomCell(cells: Cell[], size: number, tiers: TierItem[]): Cell[] {
  const grid = cellsToGrid(cells, size);
  const empty: [number, number][] = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) empty.push([r, c]);
  if (empty.length === 0) return cells;
  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  const tierId = Math.random() < 0.9 ? tiers[0].id : (tiers[1]?.id ?? tiers[0].id);
  return [...cells, { id: generateId(), tierId, row, col, isNew: true }];
}

type Direction = "up" | "down" | "left" | "right";

export function move(
  cells: Cell[], direction: Direction, size: number, tiers: TierItem[]
): { cells: Cell[]; scoreDelta: number; moved: boolean } {
  const grid = cellsToGrid(cells, size);
  let scoreDelta = 0;
  let moved = false;
  const maxTierId = tiers[tiers.length - 1].id;

  function slideRow(row: (Cell | null)[]): (Cell | null)[] {
    const filtered = row.filter(Boolean) as Cell[];
    const result: (Cell | null)[] = [];
    let i = 0;
    while (i < filtered.length) {
      if (i + 1 < filtered.length && filtered[i].tierId === filtered[i + 1].tierId) {
        const nextTier = tiers.find(t => t.id === filtered[i].tierId + 1);
        const mergedTierId = nextTier ? nextTier.id : Math.min(filtered[i].tierId + 1, maxTierId);
        scoreDelta += mergedTierId * 10;
        result.push({ ...filtered[i], tierId: mergedTierId, id: generateId(), merging: true });
        i += 2;
        moved = true;
      } else {
        result.push(filtered[i]);
        i++;
      }
    }
    while (result.length < size) result.push(null);
    return result;
  }

  function transpose(g: (Cell | null)[][]): (Cell | null)[][] {
    const s = g.length;
    return Array(s).fill(null).map((_, r) => Array(s).fill(null).map((_, c) => g[c][r]));
  }

  let rotated = grid;
  if (direction === "left") rotated = grid.map(row => slideRow(row));
  else if (direction === "right") rotated = grid.map(row => slideRow([...row].reverse()).reverse());
  else if (direction === "up") { const t = transpose(grid); rotated = transpose(t.map(row => slideRow(row))); }
  else { const t = transpose(grid); rotated = transpose(t.map(row => slideRow([...row].reverse()).reverse())); }

  if (!moved) moved = JSON.stringify(grid.map(r=>r.map(c=>c?.tierId))) !== JSON.stringify(rotated.map(r=>r.map(c=>c?.tierId)));

  const newCells: Cell[] = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (rotated[r][c]) newCells.push({ ...rotated[r][c]!, row: r, col: c, isNew: false });

  return { cells: newCells, scoreDelta, moved };
}

export function isGameOver(cells: Cell[], size: number, tiers: TierItem[]): boolean {
  if (cells.length < size * size) return false;
  return !(["up","down","left","right"] as Direction[]).some(dir => move(cells, dir, size, tiers).moved);
}

export function katkohoito(cells: Cell[], tiers: TierItem[]): Cell[] {
  const minTierId = Math.min(...cells.map(c => c.tierId));
  const minCells = cells.filter(c => c.tierId === minTierId);
  if (minCells.length === 0) return cells;
  const toRemove = minCells[Math.floor(Math.random() * minCells.length)];
  return cells.filter(c => c.id !== toRemove.id);
}