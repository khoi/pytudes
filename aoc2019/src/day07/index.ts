import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function* permutations(values: number[]): Generator<number[]> {
	if (values.length === 0) yield [];
	for (const value of values) {
		for (const tail of permutations(values.filter((other) => other !== value)))
			yield [value, ...tail];
	}
}

function thruster(input: string, phases: number[]): number {
	const amplifiers = phases.map((phase) => {
		const computer = new Intcode(input);
		computer.run([phase]);
		return computer;
	});
	let signals = [0];
	while (!amplifiers.at(-1)!.halted) {
		for (const amplifier of amplifiers) signals = amplifier.run(signals);
		if (!signals.length) throw new Error("Amplifiers produced no signal");
	}
	return signals.at(-1)!;
}

function maximum(input: string, phases: number[]): number {
	let best = -Infinity;
	for (const order of permutations(phases))
		best = Math.max(best, thruster(input, order));
	return best;
}

export const part1 = (input: string) => maximum(input, [0, 1, 2, 3, 4]);
export const part2 = (input: string) => maximum(input, [5, 6, 7, 8, 9]);
if (import.meta.main) run(import.meta.url, part1, part2);
