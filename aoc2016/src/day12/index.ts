import { run } from "../../../scripts/aoc.ts";
import { evaluate } from "../assembunny.ts";

export const part1 = (input: string) => evaluate(input).a;
export const part2 = (input: string) => evaluate(input, { c: 1 }).a;

if (import.meta.main) run(import.meta.url, part1, part2);
