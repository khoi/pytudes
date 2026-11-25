import { run } from "../../../scripts/aoc.ts";

function maze(input: string) {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	const tiles = rows.join("");
	const start = tiles.indexOf("S");
	const end = tiles.indexOf("E");
	const directions = [1, width, -1, -width];
	const scores = new Float64Array(tiles.length * 4).fill(Infinity);
	const buckets: number[][] = [];
	function relax(state: number, score: number) {
		if (score >= scores[state]) return;
		scores[state] = score;
		(buckets[score] ??= []).push(state);
	}
	relax(4 * start, 0);
	let best = Infinity;
	for (let score = 0; score < buckets.length && score <= best; score++) {
		for (const state of buckets[score] ?? []) {
			if (scores[state] !== score) continue;
			const p = Math.floor(state / 4);
			const heading = state % 4;
			if (p === end) {
				best = score;
				continue;
			}
			relax(p * 4 + ((heading + 1) % 4), score + 1000);
			relax(p * 4 + ((heading + 3) % 4), score + 1000);
			const next = p + directions[heading];
			if (tiles[next] !== "#") relax(next * 4 + heading, score + 1);
		}
	}
	if (!Number.isFinite(best)) throw new Error("Exit is unreachable");
	const route = new Set<number>();
	for (let d = 0; d < 4; d++)
		if (scores[4 * end + d] === best) route.add(4 * end + d);
	const seats = new Set<number>();
	for (const state of route) {
		const p = Math.floor(state / 4);
		const heading = state % 4;
		seats.add(p);
		const prev = (p - directions[heading]) * 4 + heading;
		if (scores[prev] === scores[state] - 1) route.add(prev);
		for (const turn of [1, 3]) {
			const from = p * 4 + ((heading + turn) % 4);
			if (scores[from] === scores[state] - 1000) route.add(from);
		}
	}
	return { best, seats: seats.size };
}

export function part1(input: string) {
	return maze(input).best;
}
export function part2(input: string) {
	return maze(input).seats;
}

if (import.meta.main) run(import.meta.url, part1, part2);
