import { NotImplemented, run } from "aoc-copilot";

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number, // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean, // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string }, // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  if (part === 1) return part1(inputs);
  if (part === 2) return part2(inputs);
  throw new NotImplemented("Not implemented");
}
type Multiplication = {
  firstFactor: number;
  secondFactor: number;
};
// example input   'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
const part1 = async (inputs: string[]): Promise<number | string> => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  const extractMultiplications = (input: string): Multiplication[] =>
    Array.from(input.matchAll(regex), (match) => ({
      firstFactor: parseInt(match[1]),
      secondFactor: parseInt(match[2]),
    }));

  const calculateProduct = ({
    firstFactor,
    secondFactor,
  }: Multiplication): number => firstFactor * secondFactor;

  const multiplications = inputs.flatMap(extractMultiplications);

  return multiplications
    .map(calculateProduct)
    .reduce((sum, product) => sum + product, 0);
};

const part2 = async (inputs: string[]): Promise<number | string> => {
  // for part 2 everything is needed as one big string
  const input = inputs.join("");

  // I swear I did come up with this regex myself :kekw: For real: Who is doing Regex without regexr.com or something like this?
  const initialPartRegex = /^((?:(?!don't\(\)).)*?)(?=don't\(\)|$)/;
  const everythingBetweenDosAndDontsRegex = /do\(\).*?(?:don't\(\)|$)/g;

  const extractRelevantParts = (input: string) => {
    const initialPart = input.match(initialPartRegex) || [];

    const everythingBetweenDosAndDonts = Array.from(
      input.matchAll(everythingBetweenDosAndDontsRegex),
      (match) => match[0],
    );
    return [initialPart[1], ...everythingBetweenDosAndDonts];
  };

  const relevantParts = extractRelevantParts(input);

  return part1(relevantParts);
};

run(__filename, solve);
