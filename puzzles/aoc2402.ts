import { NotImplemented, run } from "aoc-copilot";

type Level = number;
type Report = Level[];

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

  const countSafeReportsWithDampener = reports.filter(
    isSafeReportWithDampener,
  ).length;

  return countSafeReportsWithDampener;
};

const readReports = (inputs: string[]) =>
  inputs.map((input) => input.split(/\s+/).map(Number));

const isIncreasing = (level: Level, levelToCompare: Level): boolean =>
  levelToCompare - level > 0 && levelToCompare - level <= 3;
const isDecreasing = (level: Level, levelToCompare: Level): boolean =>
  level - levelToCompare > 0 && level - levelToCompare <= 3;

const isSafeSequence = (
  report: Report,
  checkFn: (level: Level, levelToCompare: Level) => boolean,
): boolean => {
  for (let i = 1; i < report.length; i++) {
    if (!checkFn(report[i - 1], report[i])) return false;
  }
  return true;
};

const isSafeReport = (report: Report): boolean =>
  isSafeSequence(report, isIncreasing) || isSafeSequence(report, isDecreasing);

const removeIndex = (report: Report, index: number): Report => [
  ...report.slice(0, index),
  ...report.slice(index + 1),
];

const isSafeReportWithDampener = (report: Report): boolean => {
  if (isSafeReport(report)) return true;

  for (let i = 0; i < report.length; i++) {
    if (isSafeReport(removeIndex(report, i))) return true;
  }

  return false;
};

run(__filename, solve);
