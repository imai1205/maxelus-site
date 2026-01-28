"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Tile = {
  id: number;
  value: number;
  color: string;
  row: number;
  col: number;
};

const COLORS = [
  "from-[#fff100] to-[#fdc700]", // 黄色
  "from-[#ff6b6b] to-[#ee5a6f]", // 赤
  "from-[#4ecdc4] to-[#44a08d]", // 青緑
  "from-[#95e1d3] to-[#f38181]", // ピンク
  "from-[#a8e6cf] to-[#3fc1c9]", // 水色
  "from-[#ffd93d] to-[#6bcf7f]", // 黄緑
];

const GRID_SIZE = 3; // 3x3 = 9マス

export default function PuzzleDragDrop() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [draggedTile, setDraggedTile] = useState<Tile | null>(null);
  const [dragStartPos, setDragStartPos] = useState<{ row: number; col: number } | null>(null);
  const [dragCurrentPos, setDragCurrentPos] = useState<{ row: number; col: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 初期化：数字1-9を順番に並べ、色だけランダム
  useEffect(() => {
    const initialTiles: Tile[] = [];
    let id = 0;
    let value = 1;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        initialTiles.push({
          id: id++,
          value: value++,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          row,
          col,
        });
      }
    }
    setTiles(initialTiles);
  }, []);

  // グリッド位置からタイルを取得
  const getTileAt = useCallback((row: number, col: number): Tile | undefined => {
    return tiles.find((t) => t.row === row && t.col === col);
  }, [tiles]);

  // マウス/タッチ開始
  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, tile: Tile) => {
      e.preventDefault();
      setDraggedTile(tile);
      setDragStartPos({ row: tile.row, col: tile.col });
      setDragCurrentPos({ row: tile.row, col: tile.col });
    },
    []
  );

  // マウス/タッチ移動（シンプルなドラッグ&ドロップ）
  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!draggedTile || !dragStartPos || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const cellSize = rect.width / GRID_SIZE;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (col >= 0 && col < GRID_SIZE && row >= 0 && row < GRID_SIZE) {
        setDragCurrentPos({ row, col });
      }
    },
    [draggedTile, dragStartPos]
  );

  // マウス/タッチ終了（シンプルな交換）
  const handleEnd = useCallback(() => {
    if (!draggedTile || !dragStartPos || !dragCurrentPos) {
      setDraggedTile(null);
      setDragStartPos(null);
      setDragCurrentPos(null);
      return;
    }

    const targetTile = getTileAt(dragCurrentPos.row, dragCurrentPos.col);

    if (targetTile && targetTile.id !== draggedTile.id) {
      // タイルを交換
      setTiles((prevTiles) =>
        prevTiles.map((tile) => {
          if (tile.id === draggedTile.id) {
            return { ...tile, row: dragCurrentPos.row, col: dragCurrentPos.col };
          }
          if (tile.id === targetTile.id) {
            return { ...tile, row: dragStartPos.row, col: dragStartPos.col };
          }
          return tile;
        })
      );
    }

    setDraggedTile(null);
    setDragStartPos(null);
    setDragCurrentPos(null);
  }, [draggedTile, dragStartPos, dragCurrentPos, getTileAt]);

  // グローバルイベントリスナー
  useEffect(() => {
    if (draggedTile) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);

      return () => {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };
    }
  }, [draggedTile, handleMove, handleEnd]);

  // ドラッグ中のタイルの位置を計算（パズドラ風のスムーズな動き）
  const getDraggedTileStyle = (tile: Tile) => {
    if (draggedTile?.id === tile.id && dragCurrentPos && gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const cellSize = rect.width / GRID_SIZE;
      const cellSizePercent = 100 / GRID_SIZE;
      
      return {
        position: "absolute" as const,
        left: `${dragCurrentPos.col * cellSizePercent}%`,
        top: `${dragCurrentPos.row * cellSizePercent}%`,
        width: `${cellSizePercent}%`,
        height: `${cellSizePercent}%`,
        zIndex: 1000,
        transform: "scale(1.15) rotate(5deg)",
        transition: "transform 0.1s ease-out",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      };
    }
    return {};
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        ref={gridRef}
        className="relative aspect-square bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#1e293b] dark:to-[#0b1220] rounded-2xl p-4 shadow-xl"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "4px",
        }}
      >
        {tiles.map((tile) => {
          const isDragging = draggedTile?.id === tile.id;
          const cellSize = 100 / GRID_SIZE;

          return (
            <div
              key={tile.id}
              className={`
                relative aspect-square rounded-lg flex items-center justify-center
                bg-gradient-to-br ${tile.color}
                text-[#1a1a1a] font-bold text-lg md:text-xl
                cursor-grab active:cursor-grabbing
                shadow-lg hover:shadow-xl
                ${isDragging ? "opacity-90" : "hover:scale-105 transition-all duration-200"}
              `}
              style={{
                gridColumn: isDragging ? "auto" : `${tile.col + 1}`,
                gridRow: isDragging ? "auto" : `${tile.row + 1}`,
                transition: isDragging ? "none" : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                ...getDraggedTileStyle(tile),
              }}
              onMouseDown={(e) => handleStart(e, tile)}
              onTouchStart={(e) => handleStart(e, tile)}
            >
              <span className="select-none pointer-events-none drop-shadow-md">{tile.value}</span>
              {isDragging && (
                <div className="absolute inset-0 border-3 border-white border-dashed rounded-lg opacity-60" />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-[#6b7280] dark:text-[#9ca3af] text-sm md:text-base mt-6 text-center">
        ドラッグ&ドロップでタイルを動かせます（パズドラ風インタラクション）
      </p>
    </div>
  );
}
