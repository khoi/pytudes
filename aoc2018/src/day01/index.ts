import { run } from "../../../scripts/aoc.ts";

function changes(input: string): number[] {
	return input.trim().split(/\s+/).map(Number);
}

export function part1(input: string): number {
	return changes(input).reduce((sum, change) => sum + change, 0);
}

export function part2(input: string): number {
	const cycle = changes(input);
	const offsets = new Set<number>();
	let frequency = 0;
	for (const change of cycle) {
		if (offsets.has(frequency)) return frequency;
		offsets.add(frequency);
		frequency += change;
	}
	const drift = frequency;
	if (drift === 0) return 0;

	let earliest = Infinity;
	let repeated = 0;
	for (const [index, offset] of [...offsets].entries()) {
		for (const previous of offsets) {
			const laps = (previous - offset) / drift;
			if (!Number.isInteger(laps) || laps <= 0) continue;
			const time = laps * cycle.length + index;
			if (time < earliest) {
				earliest = time;
				repeated = previous;
			}
		}
	}
	if (earliest === Infinity) throw new Error("Frequency never repeats");
	return repeated;
}

if (import.meta.main) run(import.meta.url, part1, part2);
