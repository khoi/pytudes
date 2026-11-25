import { run } from "../../../scripts/aoc.ts";

type Point = { x: number; y: number };
type Rectangle = { left: number; right: number; top: number; bottom: number };

function parse(input: string): Point[] {
	return input
		.trim()
		.split("\n")
		.map((line) => {
			const [x, y] = line.split(",").map(Number);
			return { x, y };
		});
}

function largestRectangle(
	tiles: Point[],
	allowed: (rect: Rectangle) => boolean,
) {
	let largest = 0;
	for (let i = 0; i < tiles.length; i++) {
		const a = tiles[i];
		for (const b of tiles.slice(i + 1)) {
			const left = Math.min(a.x, b.x),
				right = Math.max(a.x, b.x);
			const top = Math.min(a.y, b.y),
				bottom = Math.max(a.y, b.y);
			const area = (right - left + 1) * (bottom - top + 1);
			if (area > largest && allowed({ left, right, top, bottom }))
				largest = area;
		}
	}
	return largest;
}

export function part1(input: string): number {
	return largestRectangle(parse(input), () => true);
}

function axis(coordinates: number[]) {
	const values = [...new Set(coordinates.flatMap((n) => [n, n + 1]))].sort(
		(a, b) => a - b,
	);
	return { values, index: new Map(values.map((n, i) => [n, i])) };
}

export function part2(input: string): number {
	const tiles = parse(input);
	const xs = axis(tiles.map((tile) => tile.x));
	const ys = axis(tiles.map((tile) => tile.y));
	const edges = tiles.map((a, i) => [a, tiles[(i + 1) % tiles.length]]);
	const outsidePrefix = [new Uint32Array(xs.values.length + 1)];

	for (const y of ys.values) {
		const difference = new Int32Array(xs.values.length + 1);
		const crossings: number[] = [];

		function cover(left: number, right: number) {
			difference[xs.index.get(left)!]++;
			difference[xs.index.get(right + 1)!]--;
		}

		for (const [a, b] of edges) {
			if (a.y === b.y) {
				if (a.y === y) cover(Math.min(a.x, b.x), Math.max(a.x, b.x));
			} else if (Math.min(a.y, b.y) <= y && y < Math.max(a.y, b.y)) {
				crossings.push(a.x);
			}
		}
		crossings.sort((a, b) => a - b);
		for (let i = 0; i < crossings.length; i += 2)
			cover(crossings[i], crossings[i + 1]);

		const previous = outsidePrefix[outsidePrefix.length - 1];
		const row = new Uint32Array(previous.length);
		let coverage = 0,
			outside = 0;
		for (let x = 0; x < xs.values.length; x++) {
			coverage += difference[x];
			if (coverage === 0) outside++;
			row[x + 1] = previous[x + 1] + outside;
		}
		outsidePrefix.push(row);
	}

	return largestRectangle(tiles, ({ left, right, top, bottom }) => {
		const x1 = xs.index.get(left)!,
			x2 = xs.index.get(right + 1)!;
		const y1 = ys.index.get(top)!,
			y2 = ys.index.get(bottom + 1)!;
		return (
			outsidePrefix[y2][x2] -
				outsidePrefix[y1][x2] -
				outsidePrefix[y2][x1] +
				outsidePrefix[y1][x1] ===
			0
		);
	});
}

if (import.meta.main) run(import.meta.url, part1, part2);
