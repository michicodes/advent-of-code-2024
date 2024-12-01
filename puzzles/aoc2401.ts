import { NotImplemented, run } from "aoc-copilot";

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number, // Indicates whether the solver is being called for part 1 or 2 of the puzzle
): Promise<number | string> {
  if (part === 1) return part1(inputs);
  if (part === 2) return part2(inputs);
  throw new NotImplemented("Not implemented");
}
const readLocationLists = (inputs: string[]) => {
  const splittedList = inputs.map((input) => input.split(/\s+/).map(Number));

  const firstLocations = splittedList.map((list) => list[0]);
  const secondLocations = splittedList.map((list) => list[1]);
  return { firstLocations, secondLocations };
};

const zip = (a: number[], b: number[]) => a.map((k, j) => [k, b[j]]);
const part1 = async (inputs: string[]): Promise<number | string> => {
  const { firstLocations, secondLocations } = readLocationLists(inputs);

  const orderedFirstLocations = firstLocations.sort();
  const orderedSecondLocations = secondLocations.sort();

  return zip(orderedFirstLocations, orderedSecondLocations)
    .map(([firstLocation, secondLocation]) =>
      Math.abs(firstLocation - secondLocation),
    )
    .reduce((a, b) => a + b, 0);
};

const part2 = async (inputs: string[]): Promise<number | string> => {
  const { firstLocations, secondLocations } = readLocationLists(inputs);
  const containsfirstLocationTimesinSecondLocations = (firstLocation: number) =>
    secondLocations.filter((secondLocation) => secondLocation === firstLocation)
      .length;

  return firstLocations
    .map(
      (firstLocation) =>
        firstLocation *
        containsfirstLocationTimesinSecondLocations(firstLocation),
    )
    .reduce((a, b) => a + b, 0);
};

run(__filename, solve);
