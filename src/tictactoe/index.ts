import { getFromCache } from "./cache";
import type { Board, Action, Player } from "./types";

// let count = 0;
export const initialBoard: Board = [
  ["Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty"],
];

export const player = (board: Board): Player => {
  let emptyCount = 0;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell === "Empty") {
        emptyCount++;
      }
    });
  });

  //   X always starts, so an even number of empty cells means that it's O turn
  return emptyCount % 2 === 0 ? "O" : "X";
};

export const actions = (board: Board) => {
  const possibleActions: Array<Action> = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      if (cell === "Empty") {
        possibleActions.push([row, col]);
      }
    }
  }
  return possibleActions;
};

export const result = (board: Board, action: Action) => {
  const [row, col] = action;
  if (board[row][col] !== "Empty") {
    throw new Error("Invalid action");
  }

  const resultantBoard: Board = structuredClone(board);
  resultantBoard[row][col] = player(board);

  return resultantBoard;
};

export const winner = (board: Board) => {
  // Check rows and cols
  for (let i = 0; i < board.length; i++) {
    const firstCellOfCol = board[i][0];
    if (
      firstCellOfCol !== "Empty" &&
      firstCellOfCol === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return firstCellOfCol;
    }

    const firstCellOfRow = board[0][i];
    if (
      firstCellOfRow !== "Empty" &&
      firstCellOfRow === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      return firstCellOfRow;
    }
  }

  // Check diagonals
  const midCell = board[1][1];
  const firstDiagonalAllEqual =
    board[0][0] === midCell && midCell === board[2][2];
  const secondDiagonalAllEqual =
    board[0][2] === midCell && midCell === board[2][0];
  if (
    midCell !== "Empty" &&
    (firstDiagonalAllEqual || secondDiagonalAllEqual)
  ) {
    return midCell;
  }

  return null;
};

export const boardFilled = (board: Board) => {
  return board.every((row) => row.every((cell) => cell !== "Empty"));
};

export const terminal = (board: Board) => {
  return Boolean(winner(board) || boardFilled(board));
};

export const utility = (board: Board) => {
  // Returns 1 if X has won the game, -1 if O has won, 0 otherwise.
  const winnerPlayer = winner(board);

  const utilitiesByWinner: Record<Player, number> = {
    X: 1,
    O: -1,
  };

  return winnerPlayer ? utilitiesByWinner[winnerPlayer] : 0;
};

export const minimax = (board: Board) => {
  return new Promise<Action | null>((resolve, reject) => {
    setTimeout(() => {
      if (terminal(board)) {
        resolve(null);
      }

      const currentPlayer = player(board);
      const cachedAction = getFromCache(board);
      if (cachedAction) {
        console.log("HIY");
        resolve(cachedAction);
      }

      if (currentPlayer === "X") {
        const result = maxValue(board)[1];
        if (result) {
          resolve(result);
        }
      } else {
        const result = minValue(board)[1];
        if (result) {
          resolve(result);
        }
      }
    }, 10);
  });
};

export const maxValue = (board: Board): [number, Action | null] => {
  //   count++;
  if (terminal(board)) {
    return [utility(board), null];
  }

  let bestValue = -Infinity;
  let bestAction: Action = [0, 0];

  actions(board).forEach((action) => {
    const partialBest = minValue(result(board, action))[0];
    if (bestValue < partialBest) {
      bestValue = partialBest;
      bestAction = action;
    }
  });

  return [bestValue, bestAction];
};

export const minValue = (board: Board): [number, Action | null] => {
  //   count++;
  if (terminal(board)) {
    return [utility(board), null];
  }

  let bestValue = Infinity;
  let bestAction: Action = [0, 0];

  actions(board).forEach((action) => {
    const partialBest = maxValue(result(board, action))[0];
    if (bestValue > partialBest) {
      bestValue = partialBest;
      bestAction = action;
    }
  });

  return [bestValue, bestAction];
};

export const AIMove = async (board: Board) => {
  const bestAction = await minimax(board);
  if (bestAction) {
    return result(board, bestAction);
  }
};

export const humanMove = (board: Board, action: Action) => {
  if (!terminal(board)) {
    return result(board, action);
  }
};

// console.log(minimax(initialBoard));
// // console.log(count);
