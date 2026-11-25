import { run } from "../../../scripts/aoc.ts";
import { evaluate } from "../assembunny.ts";

export function part1(input: string) {
	return evaluate(input, { a: 7 }).a;
}

export function part2(input: string) {
	return evaluate(input, { a: 12 }).a;
}

if (import.meta.main) run(import.meta.url, part1, part2);
