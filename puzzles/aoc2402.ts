import { NotImplemented, run } from "aoc-copilot";

type Level = number;
type Report = Level[];
type Change = [Level, Level];
type LevelDirection = "increasing" | "decreasing" | "same";

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number, // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
  if (part === 1) return part1(inputs);
  if (part === 2) return part2(inputs);
  throw new NotImplemented("Not implemented");
}

const part1 = async (inputs: string[]): Promise<number | string> => {
  const reports: Report[] = inputs.map((input) =>
    input.split(/\s+/).map(Number),
  );

  const isSafeReport = (report: Report) => {
    const changes: Change[] = report.slice(1).map((level: Level, index) => {
      const previousLevel = report[index];
      return [previousLevel, level];
    });

    const levelDirection = (change: Change): LevelDirection => {
      const [previousLevel, level] = change;
      if (previousLevel < level) return "increasing";
      if (previousLevel > level) return "decreasing";
      return "same";
    };

    const initialLevelDirection = levelDirection(changes[0]);
    const isSameDirection = (change: Change) =>
      levelDirection(change) === initialLevelDirection;

    const isRateOfChangeAcceptable = (change: Change): boolean => {
      const [previousLevel, level] = change;
      const rateOfChange = Math.abs(previousLevel - level);
      return 0 < rateOfChange && rateOfChange < 4;
    };

    return changes.every(
      (change) => isSameDirection(change) && isRateOfChangeAcceptable(change),
    );
  };

  const safeReports = reports.filter(isSafeReport).length;

  return safeReports;
};

const part2 = async (inputs: string[]): Promise<number | string> => {
  throw new NotImplemented("Not implemented");
};

run(__filename, solve);
