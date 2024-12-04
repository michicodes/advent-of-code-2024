import { NotImplemented, run } from "aoc-copilot";

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number, // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
  if (part === 1) return part1(inputs);
  if (part === 2) return part2(inputs);
  throw new NotImplemented("Not implemented");
}

const part1 = async (inputs: string[]): Promise<number | string> => {
  const transposedBoard = inputs[0]
    .split("")
    .map((_, i) => inputs.map((row) => row[i]).join(""));
  const diagonalBoard = getDiagonals(inputs);

  const horizontalWords = findWords(inputs);
  const verticalWords = findWords(transposedBoard);
  const diagonalWords = findWords(diagonalBoard);

  return horizontalWords + verticalWords + diagonalWords;
};

const part2 = async (inputs: string[]): Promise<number | string> => {
  const grid = inputs.map((row) => {
    return row.split("");
  });

  let foundXMAS = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const isCrossMAS = (i: number, j: number): boolean =>
        grid[i][j] === "A" &&
        ((grid[i - 1][j - 1] === "M" && grid[i + 1][j + 1] === "S") ||
          (grid[i - 1][j - 1] === "S" && grid[i + 1][j + 1] === "M")) &&
        ((grid[i + 1][j - 1] === "M" && grid[i - 1][j + 1] === "S") ||
          (grid[i + 1][j - 1] === "S" && grid[i - 1][j + 1] === "M"));
      try {
        if (isCrossMAS(i, j)) {
          foundXMAS++;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Ignore out of bounds :kekw:
        console.log(
          "do I look like I would do it correctly for advent of code?",
        );
      }
    }
  }
  return foundXMAS;
};

const XMASRegex = "XMAS".replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const forwardRegex = new RegExp(XMASRegex, "g");
const backwardRegex = new RegExp(XMASRegex.split("").reverse().join(""), "g");

const findWords = (board: string[]): number => {
  return board
    .map((row) => {
      const forwardMatches = row.match(forwardRegex);
      const backwardMatches = row.match(backwardRegex);
      return (forwardMatches || []).length + (backwardMatches || []).length;
    })
    .reduce((sum, occurrence) => sum + occurrence, 0);
};

const getDiagonals = (board: string[]): string[] => {
  const height = board.length;
  const width = board[0].length;
  const diagonals: string[] = [];

  // Top-left to bottom-right diagonals
  for (let startCol = 0; startCol < width; startCol++) {
    let diagonal = "";
    for (let i = 0; i < height && startCol + i < width; i++) {
      diagonal += board[i][startCol + i];
    }
    if (diagonal.length > 1) diagonals.push(diagonal);
  }

  for (let startRow = 1; startRow < height; startRow++) {
    let diagonal = "";
    for (let i = 0; i < width && startRow + i < height; i++) {
      diagonal += board[startRow + i][i];
    }
    if (diagonal.length > 1) diagonals.push(diagonal);
  }

  // Top-right to bottom-left diagonals
  for (let startCol = width - 1; startCol >= 0; startCol--) {
    let diagonal = "";
    for (let i = 0; i < height && startCol - i >= 0; i++) {
      diagonal += board[i][startCol - i];
    }
    if (diagonal.length > 1) diagonals.push(diagonal);
  }

  for (let startRow = 1; startRow < height; startRow++) {
    let diagonal = "";
    for (let i = 0; i < width && startRow + i < height; i++) {
      diagonal += board[startRow + i][width - 1 - i];
    }
    if (diagonal.length > 1) diagonals.push(diagonal);
  }

  return diagonals;
};
run(__filename, solve);
