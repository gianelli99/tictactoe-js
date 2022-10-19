import type { Action, Board } from "./types";

const cache = new Map<string, Action>();

export const storeInCache = (board: Board, bestAction: Action) => {
  const key = JSON.stringify(board);
  cache.set(key, bestAction);
};

export const getFromCache = (board: Board) => {
  const key = JSON.stringify(board);
  return cache.get(key);
};

const basicBoard: Board = [
  ["Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty"],
];
basicBoard[1][1] = "X";
storeInCache(basicBoard, [0, 0]);

const generateCache = () => {};
