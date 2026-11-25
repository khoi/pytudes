import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function boost(input: string, mode: number): number {
	const output = new Intcode(input).run([mode]);
	if (output.length !== 1) throw new Error("BOOST returned diagnostic errors");
	return output[0];
}

export const part1 = (input: string) => boost(input, 1);
export const part2 = (input: string) => boost(input, 2);
if (import.meta.main) run(import.meta.url, part1, part2);
