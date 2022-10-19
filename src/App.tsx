import { useState } from "react";
import { initialBoard, AIMove, humanMove } from "./tictactoe";
import "./App.css";
import { Cell } from "./Cell";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [AIthinking, setAIthinking] = useState(false);

  const handleMove = async (row: number, col: number) => {
    if (AIthinking) return;
    setAIthinking(true);

    const humanMoveResult = humanMove(board, [row, col]);
    if (humanMoveResult) {
      setBoard(humanMoveResult);
      const AIResponseResult = AIMove(humanMoveResult);
      if (AIResponseResult) {
        setBoard(AIResponseResult);
      }
    }

    setAIthinking(false);
  };

  return (
    <main>
      {board.map((row, rowIdx) => (
        <div className="row" key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <Cell
              key={`${rowIdx}-${cellIdx}`}
              onClick={handleMove}
              row={rowIdx}
              col={cellIdx}
              content={cell}
            />
          ))}
        </div>
      ))}
    </main>
  );
}

export default App;
