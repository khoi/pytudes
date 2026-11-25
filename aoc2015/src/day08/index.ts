import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	let difference = 0;
	for (const literal of input.trim().split(/\r?\n/)) {
		const decoded = literal
			.slice(1, -1)
			.replace(/\\(?:x[\da-f]{2}|["\\])/gi, "_");
		difference += literal.length - decoded.length;
	}
	return difference;
}

export function part2(input: string): number {
	let difference = 0;
	for (const literal of input.trim().split(/\r?\n/)) {
		difference += 2 + (literal.match(/["\\]/g)?.length ?? 0);
	}
	return difference;
}

if (import.meta.main) run(import.meta.url, part1, part2);
