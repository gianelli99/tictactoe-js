import { useState } from "react";
import { initialBoard, AIMove, humanMove, winner, terminal } from "./tictactoe";
import { Cell } from "./Cell";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [AIthinking, setAIthinking] = useState(false);
  const [gameError, setGameError] = useState<string>();

  const handleMove = async (row: number, col: number) => {
    if (AIthinking) return;
    setAIthinking(true);

    try {
      // Human move
      const humanMoveResult = humanMove(board, [row, col]);
      if (!humanMoveResult) {
        return;
      }
      setBoard(humanMoveResult);

      // AI response
      const AIResponseResult = await AIMove(humanMoveResult);
      if (!AIResponseResult) {
        return;
      }
      setBoard(AIResponseResult);
      setAIthinking(false);
    } catch (error) {
      setGameError("An error ocurred");
    }
  };

  const gameEnded = terminal(board);
  const theWinner = winner(board);
  const isTie = gameEnded && !theWinner;
  const resultMessage = theWinner ? `Player ${theWinner} Wins` : "Tie";

  return (
    <main className="flex justify-center flex-col min-h-full">
      {AIthinking && <h1 className="mx-auto">AI Thinking</h1>}
      {gameEnded && <h2>{resultMessage}</h2>}
      {board.map((row, rowIdx) => (
        <div className="flex mx-auto justify-center" key={rowIdx}>
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
