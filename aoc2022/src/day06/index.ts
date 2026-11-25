import { run } from "../../../scripts/aoc.ts";

function marker(input: string, length: number) {
	const lastSeen = new Map<string, number>();
	let start = 0;
	for (const [i, char] of [...input.trim()].entries()) {
		start = Math.max(start, (lastSeen.get(char) ?? -1) + 1);
		if (i - start + 1 === length) return i + 1;
		lastSeen.set(char, i);
	}
	throw new Error("Marker not found");
}

export function part1(input: string) {
	return marker(input, 4);
}

export function part2(input: string) {
	return marker(input, 14);
}

if (import.meta.main) run(import.meta.url, part1, part2);
