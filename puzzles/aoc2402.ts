import { NotImplemented, run } from "aoc-copilot";

type Level = number;
type Report = Level[];
type TupleChange = [Level, Level];
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
  const reports: Report[] = readReports(inputs);

  const safeReports = reports.filter(isSafeReport).length;

  return safeReports;
};

const part2 = async (inputs: string[]): Promise<number | string> => {
  const reports: Report[] = readReports(inputs);
  const isSafeReportWithDampener = (report: Report) => {
    if (isSafeReport(report)) return true;

    return report
      .map((_, i) => [...report.slice(0, i), ...report.slice(i + 1)])
      .some(isSafeReport);
  };
  const countSafeReportsWithDampener = reports.filter(
    isSafeReportWithDampener,
  ).length;

  return countSafeReportsWithDampener;
};

const readReports = (inputs: string[]) =>
  inputs.map((input) => input.split(/\s+/).map(Number));

const isRateOfChangeAcceptable = (change: TupleChange): boolean => {
  const [previousLevel, level] = change;
  const rateOfChange = Math.abs(previousLevel - level);
  return 0 < rateOfChange && rateOfChange < 4;
};

const levelDirection = (change: TupleChange): LevelDirection => {
  const [previousLevel, level] = change;
  if (previousLevel < level) return "increasing";
  if (previousLevel > level) return "decreasing";
  return "same";
};
const isSameAndCorrectDirection = (
  change: TupleChange,
  initialLevelDirection: LevelDirection,
) =>
  levelDirection(change) !== "same" &&
  levelDirection(change) === initialLevelDirection;

const isSafeReport = (report: Report) => {
  const changes: TupleChange[] = report.slice(1).map((level: Level, index) => {
    const previousLevel = report[index];
    return [previousLevel, level];
  });

  const initialLevelDirection = levelDirection(changes[0]);

  return changes.every(
    (change) =>
      isSameAndCorrectDirection(change, initialLevelDirection) &&
      isRateOfChangeAcceptable(change),
  );
};

run(__filename, solve);
