import type { Symbols } from "./tictactoe/types";

interface CellProps {
  row: number;
  col: number;
  content: Symbols;
  onClick: (row: number, col: number) => void;
}

export const Cell = ({ col, row, onClick, content }: CellProps) => {
  return (
    <div
      onClick={() => onClick(row, col)}
      className="border-solid border-black border w-16 h-16 flex items-center justify-center"
    >
      {content === "Empty" ? "" : content}
    </div>
  );
};
