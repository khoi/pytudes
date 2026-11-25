import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function diagnose(input: string, system: number): number {
	const output = new Intcode(input).run([system]);
	const code = output.pop();
	if (code === undefined || output.some((value) => value !== 0))
		throw new Error("Diagnostic check failed");
	return code;
}

export const part1 = (input: string) => diagnose(input, 1);
export const part2 = (input: string) => diagnose(input, 5);
if (import.meta.main) run(import.meta.url, part1, part2);
