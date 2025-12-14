import { readFileSync } from "node:fs";

const sample = readFileSync(new URL("./sample.txt", import.meta.url), "utf-8");
const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

export function part1(input: string): number {
	const [rangesSection, idsSection] = input.trim().split("\n\n");

	const ranges = rangesSection.split("\n").map(line => {
		const [start, end] = line.split("-").map(Number);
		return { start, end };
	});

	const availableIds = idsSection.split("\n").map(Number);

	return availableIds.filter(id =>
		ranges.some(range => id >= range.start && id <= range.end)
	).length;
}

export function part2(input: string): number {
	const [rangesSection] = input.trim().split("\n\n");

	const ranges = rangesSection.split("\n").map(line => {
		const [start, end] = line.split("-").map(Number);
		return { start, end };
	});

	ranges.sort((a, b) => a.start - b.start);

	const merged: { start: number; end: number }[] = [];
	for (const range of ranges) {
		const last = merged[merged.length - 1];
		if (!last || range.start > last.end + 1) {
			merged.push(range);
		} else {
			last.end = Math.max(last.end, range.end);
		}
	}

	return merged.reduce((sum, range) => sum + range.end - range.start + 1, 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
