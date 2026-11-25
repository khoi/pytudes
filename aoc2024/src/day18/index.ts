import { run } from "../../../scripts/aoc.ts";

function bytes(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(",").map(Number));
}

function shortest(points: number[][], size: number, count: number) {
	const blocked = new Uint8Array(size * size);
	for (const [x, y] of points.slice(0, count)) blocked[y * size + x] = 1;
	if (blocked[0] || blocked[blocked.length - 1]) return Infinity;
	const distance = new Int32Array(size * size).fill(-1);
	const queue = [0];
	distance[0] = 0;
	for (let head = 0; head < queue.length; head++) {
		const p = queue[head];
		if (p === distance.length - 1) return distance[p];
		for (const [dx, dy] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]) {
			const x = (p % size) + dx;
			const y = Math.floor(p / size) + dy;
			const n = y * size + x;
			if (
				x < 0 ||
				y < 0 ||
				x >= size ||
				y >= size ||
				distance[n] !== -1 ||
				blocked[n]
			)
				continue;
			distance[n] = distance[p] + 1;
			queue.push(n);
		}
	}
	return Infinity;
}

export function part1(input: string, size = 71, count = 1024) {
	return shortest(bytes(input), size, count);
}

export function part2(input: string, size = 71) {
	const points = bytes(input);
	let low = 0;
	let high = points.length;
	if (shortest(points, size, high) !== Infinity)
		throw new Error("Path remains open");
	while (low + 1 < high) {
		const mid = Math.floor((low + high) / 2);
		if (shortest(points, size, mid) === Infinity) high = mid;
		else low = mid;
	}
	return points[high - 1].join(",");
}

if (import.meta.main) run(import.meta.url, part1, part2);
