import { run } from "../../../scripts/aoc.ts";

function distances(tiles: string, width: number, start: number) {
	const dist = new Int32Array(tiles.length).fill(-1);
	dist[start] = 0;
	const queue = [start];
	for (let head = 0; head < queue.length; head++) {
		const p = queue[head];
		for (const n of [p - 1, p + 1, p - width, p + width]) {
			if (dist[n] !== -1 || tiles[n] === "#") continue;
			dist[n] = dist[p] + 1;
			queue.push(n);
		}
	}
	return dist;
}

function cheats(input: string, duration: number, savings: number) {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	const tiles = rows.join("");
	const end = tiles.indexOf("E");
	const fromStart = distances(tiles, width, tiles.indexOf("S"));
	const fromEnd = distances(tiles, width, end);
	const limit = fromStart[end] - savings;
	let count = 0;
	for (let p = 0; p < tiles.length; p++) {
		if (fromStart[p] < 0 || fromStart[p] > limit) continue;
		const x = p % width;
		const y = Math.floor(p / width);
		for (let dy = -duration; dy <= duration; dy++) {
			if (y + dy < 0 || y + dy >= rows.length) continue;
			const dxMax = duration - Math.abs(dy);
			for (
				let dx = Math.max(-dxMax, -x);
				dx <= Math.min(dxMax, width - 1 - x);
				dx++
			) {
				const q = p + dy * width + dx;
				const travel = Math.abs(dx) + Math.abs(dy);
				if (
					travel &&
					fromEnd[q] >= 0 &&
					fromStart[p] + travel + fromEnd[q] <= limit
				)
					count++;
			}
		}
	}
	return count;
}

export function part1(input: string, savings = 100) {
	return cheats(input, 2, savings);
}
export function part2(input: string, savings = 100) {
	return cheats(input, 20, savings);
}

if (import.meta.main) run(import.meta.url, part1, part2);
