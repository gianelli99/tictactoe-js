// export const symbols = {
//   X: "X",
//   O: "O",
//   Empty: "Emptyyy",
// } as const;
// export type Board = Array<Array<typeof symbols[keyof typeof symbols]>>;

export type Player = "X" | "O";
export type Symbols = Player | "Empty";
export type Board = Array<Array<Symbols>>;

export type Action = [number, number];
