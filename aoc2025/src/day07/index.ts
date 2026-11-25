import { run } from "../../../scripts/aoc.ts";

function trace(input: string) {
	const [top, ...rows] = input.trim().split(/\r?\n/);
	let paths = new Map([[top.indexOf("S"), 1]]);
	let splits = 0;
	let timelines = 1;

	for (const row of rows) {
		const next = new Map<number, number>();
		for (const [column, count] of paths) {
			if (row[column] === "^") {
				splits++;
				timelines += count;
				next.set(column - 1, (next.get(column - 1) ?? 0) + count);
				next.set(column + 1, (next.get(column + 1) ?? 0) + count);
			} else {
				next.set(column, (next.get(column) ?? 0) + count);
			}
		}
		paths = next;
	}

	return { splits, timelines };
}

export function part1(input: string): number {
	return trace(input).splits;
}

export function part2(input: string): number {
	return trace(input).timelines;
}

if (import.meta.main) run(import.meta.url, part1, part2);
