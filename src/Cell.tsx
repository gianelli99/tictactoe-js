interface CellProps {
  row: number;
  col: number;
  content: string;
  onClick: (row: number, col: number) => void;
}

export const Cell = ({ col, row, onClick, content }: CellProps) => {
  return (
    <div onClick={() => onClick(row, col)} className="cell">
      {content}
    </div>
  );
};
