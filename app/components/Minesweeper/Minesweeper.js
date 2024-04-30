"use client";

import { useState } from "react";
import { rows, cols, mines } from "./config";
import { createBoard } from "./helpers";
import classNames from "classnames";

export const clearZeros = (board, row, column) => {
  // fix infinite calls
  const prevX = board[row]?.[column - 1];
  const nextX = board[row]?.[column + 1];
  const prevY = board[row - 1]?.[column];
  const nextY = board[row + 1]?.[column];

  if (prevX && !prevX.discovered) {
    if (prevX.number === 0) {
      prevX.discovered = true;
    }
    clearZeros(board, row - 1, column);
  }

  if (nextX && !nextX.discovered) {
    if (nextX.number === 0) {
      nextX.discovered = true;
    }
    clearZeros(board, row + 1, column);
  }

  if (nextY && !nextY.discovered) {
    if (nextY.number === 0) {
      nextY.discovered = true;
    }
    clearZeros(board, row, column + 1);
  }

  if (prevY && !prevY.discovered) {
    if (prevY.number === 0) {
      prevY.discovered = true;
    }
    clearZeros(board, row, column - 1);
  }
};

export const clearBoardZeros = (board, row, column) => {
  const boardCopy = structuredClone(board);
  // clearZeros(boardCopy, row, column);
  return boardCopy;
};

export default function Minesweeper() {
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState(createBoard(rows, cols, mines));

  const reset = () => {
    setBoard(createBoard(rows, cols, mines));
    setGameOver(false);
  }

  const handleContextMenu = (row, column) => (event) => {
    event.preventDefault();
    const cell = board[row][column];

    console.log({ cell });

    if (cell.discovered) return;

    if (!cell.flag && !cell.question) {
      cell.flag = true;
    } else if (cell.flag) {
      cell.question = true;
      cell.flag = false;
    } else if (cell.question) {
      cell.question = false;
    }

    setBoard([...board]);
  };

  const handleClick = (row, column) => () => {
    if (gameOver) return;

    const cell = board[row][column];
    if (cell.flag || cell.question) return;

    cell.discovered = true;

    if (cell.hasMine) {
      setGameOver(true);
    }

    if (cell.number === 0) {
      setBoard(clearBoardZeros(board, row, column));
    } else {
      setBoard([...board]);
    }
  };

  return (
    <div>
      {gameOver && (
        <div onClick={reset}>
          Game Over!
          </div>
      )}
      <main className="min-w-[500px] w-1/3 mt-5 mx-auto text-center bg-slate-50 b-1 text-xs text-slate-700">
        {board.map((row, rowIndex) => {
          return (
            <div
              key={rowIndex}
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              className={`grid grid-cols-${cols} gap-px mb-px`}
            >
              {row.map((cell, columnIndex) => {
                const hasZero = cell.discovered && cell.number === 0;
                return (
                  <div
                    key={columnIndex}
                    onClick={handleClick(rowIndex, columnIndex)}
                    onContextMenu={handleContextMenu(rowIndex, columnIndex)}
                    className={classNames(
                      "flex items-center justify-center aspect-square cursor-pointer hover:bg-slate-200",
                      {
                        "bg-slate-100 border": !hasZero,
                        "bg-slate-300": hasZero,
                      }
                    )}
                  >
                    {cell.flag && "🚩"}
                    {cell.question && "❓"}
                    {cell.discovered &&
                      (cell.hasMine ? "💣" : cell.number || "")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}
