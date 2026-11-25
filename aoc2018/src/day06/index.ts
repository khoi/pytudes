import { run } from "../../../scripts/aoc.ts";

function coordinates(input: string) {
	const sites = input
		.trim()
		.split("\n")
		.map((line) => line.split(",").map(Number));
	const xs = sites.map(([x]) => x);
	const ys = sites.map(([, y]) => y);
	return {
		sites,
		xs,
		ys,
		left: Math.min(...xs),
		right: Math.max(...xs),
		top: Math.min(...ys),
		bottom: Math.max(...ys),
	};
}

export function part1(input: string): number {
	const { sites, left, right, top, bottom } = coordinates(input);
	const areas = sites.map(() => 0);
	const infinite = new Set<number>();
	for (let y = top; y <= bottom; y++) {
		for (let x = left; x <= right; x++) {
			let nearest = -1;
			let best = Infinity;
			for (let id = 0; id < sites.length; id++) {
				const distance =
					Math.abs(x - sites[id][0]) + Math.abs(y - sites[id][1]);
				if (distance < best) {
					best = distance;
					nearest = id;
				} else if (distance === best) nearest = -1;
			}
			if (nearest === -1) continue;
			areas[nearest]++;
			if (x === left || x === right || y === top || y === bottom)
				infinite.add(nearest);
		}
	}
	return Math.max(0, ...areas.filter((_, i) => !infinite.has(i)));
}

export function part2(input: string, limit = 10_000): number {
	const { xs, ys, sites, left, right, top, bottom } = coordinates(input);
	const margin = Math.floor((limit - 1) / sites.length);
	function distances(axis: number[], min: number, max: number) {
		return Array.from({ length: max - min + 1 + 2 * margin }, (_, i) =>
			axis.reduce(
				(sum, value) => sum + Math.abs(value - (min - margin + i)),
				0,
			),
		);
	}
	const horizontal = distances(xs, left, right);
	const vertical = distances(ys, top, bottom).sort((a, b) => a - b);
	let area = 0;
	for (const distance of horizontal) {
		let low = 0;
		let high = vertical.length;
		while (low < high) {
			const mid = Math.floor((low + high) / 2);
			if (vertical[mid] + distance < limit) low = mid + 1;
			else high = mid;
		}
		area += low;
	}
	return area;
}

if (import.meta.main) run(import.meta.url, part1, part2);
