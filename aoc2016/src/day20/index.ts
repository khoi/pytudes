import { run } from "../../../scripts/aoc.ts";

function* allowed(input: string, limit: number) {
	const ranges = input
		.trim()
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => line.split("-").map(Number))
		.sort(([a], [b]) => a - b);
	let next = 0;
	for (const [start, end] of ranges) {
		if (start > limit) break;
		if (start > next) yield { first: next, count: start - next };
		next = Math.max(next, end + 1);
	}
	if (next <= limit) yield { first: next, count: limit + 1 - next };
}

export function part1(input: string) {
	const gap = allowed(input, 0xffff_ffff).next();
	if (gap.done) throw new Error("All addresses are blocked");
	return gap.value.first;
}

export function part2(input: string, limit = 0xffff_ffff) {
	let total = 0;
	for (const gap of allowed(input, limit)) total += gap.count;
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
