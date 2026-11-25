import { run } from "../../../scripts/aoc.ts";

function parse(input: string) {
	const [fresh, available = ""] = input.trim().split(/\r?\n\r?\n/);
	const ranges = fresh.split(/\r?\n/).map((line) => {
		const [start, end] = line.split("-").map(Number);
		return { start, end };
	});
	const ids = available.split(/\r?\n/).filter(Boolean).map(Number);
	return { ranges, ids };
}

export function part1(input: string): number {
	const { ranges, ids } = parse(input);
	return ids.filter((id) =>
		ranges.some(({ start, end }) => start <= id && id <= end),
	).length;
}

export function part2(input: string): number {
	const { ranges } = parse(input);
	ranges.sort((a, b) => a.start - b.start);
	let total = 0;
	let previousEnd = -1;
	for (const { start, end } of ranges) {
		const uncovered = Math.max(start, previousEnd + 1);
		if (uncovered > end) continue;
		total += end - uncovered + 1;
		previousEnd = end;
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
