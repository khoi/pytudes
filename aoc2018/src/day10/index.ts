import { run } from "../../../scripts/aoc.ts";
import { decodeLetters } from "../../../scripts/ocr.ts";

function stars(input: string) {
	return input
		.trim()
		.split("\n")
		.map((line) => {
			const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number);
			return { x, y, vx, vy };
		});
}

function bounds(points: ReturnType<typeof stars>, time: number) {
	let left = Infinity,
		right = -Infinity,
		top = Infinity,
		bottom = -Infinity;
	for (const { x, y, vx, vy } of points) {
		const column = x + vx * time;
		const row = y + vy * time;
		left = Math.min(left, column);
		right = Math.max(right, column);
		top = Math.min(top, row);
		bottom = Math.max(bottom, row);
	}
	return { left, right, top, bottom };
}

function alignment(points: ReturnType<typeof stars>): number {
	function span(time: number) {
		const { left, right, top, bottom } = bounds(points, time);
		return right - left + bottom - top;
	}
	let high = 1;
	while (span(high) > span(high + 1)) high *= 2;
	let low = 0;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		if (span(mid + 1) < span(mid)) low = mid + 1;
		else high = mid;
	}
	return low;
}

export function part1(input: string): string {
	const points = stars(input);
	const time = alignment(points);
	const { left, right, top, bottom } = bounds(points, time);
	const rows = Array.from({ length: bottom - top + 1 }, () =>
		Array(right - left + 1).fill("."),
	);
	for (const { x, y, vx, vy } of points)
		rows[y + vy * time - top][x + vx * time - left] = "#";
	return decodeLetters(rows.map((row) => row.join("")));
}

export function part2(input: string): number {
	return alignment(stars(input));
}

if (import.meta.main) run(import.meta.url, part1, part2);
