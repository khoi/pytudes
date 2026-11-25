import { run } from "../../../scripts/aoc.ts";

function robots(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.match(/-?\d+/g)!.map(Number));
}

function wrap(n: number, size: number) {
	return ((n % size) + size) % size;
}

export function part1(input: string, width = 101, height = 103) {
	const quadrants = [0, 0, 0, 0];
	const midX = Math.floor(width / 2);
	const midY = Math.floor(height / 2);
	for (const [px, py, vx, vy] of robots(input)) {
		const x = wrap(px + 100 * vx, width);
		const y = wrap(py + 100 * vy, height);
		if (x !== midX && y !== midY)
			quadrants[Number(x > midX) + 2 * Number(y > midY)]++;
	}
	return quadrants.reduce((a, b) => a * b);
}

export function part2(input: string, width = 101, height = 103) {
	const moving = robots(input);
	const occupied = new Int32Array(width * height).fill(-1);
	let bestTime = 0;
	let mostNeighbors = -1;
	for (let t = 0; t < width * height; t++) {
		const positions: number[] = [];
		for (const [px, py, vx, vy] of moving) {
			const p = wrap(py + t * vy, height) * width + wrap(px + t * vx, width);
			if (occupied[p] !== t) positions.push(p);
			occupied[p] = t;
		}
		let neighbors = 0;
		for (const p of positions) {
			if (p % width < width - 1 && occupied[p + 1] === t) neighbors++;
			if (occupied[p + width] === t) neighbors++;
		}
		if (neighbors > mostNeighbors) {
			mostNeighbors = neighbors;
			bestTime = t;
		}
	}
	return bestTime;
}

if (import.meta.main) run(import.meta.url, part1, part2);
