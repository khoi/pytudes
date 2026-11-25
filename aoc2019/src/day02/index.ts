import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

export function execute(input: string, noun: number, verb: number): number {
	const computer = new Intcode(input);
	computer.set(1, noun);
	computer.set(2, verb);
	computer.run();
	return computer.get(0);
}

export const part1 = (input: string) => execute(input, 12, 2);

export function part2(input: string, target = 19690720): number {
	for (let noun = 0; noun < 100; noun++) {
		for (let verb = 0; verb < 100; verb++) {
			if (execute(input, noun, verb) === target) return 100 * noun + verb;
		}
	}
	throw new Error("No noun and verb produce the requested output");
}

if (import.meta.main) run(import.meta.url, part1, part2);
