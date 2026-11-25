import { run } from "../../../scripts/aoc.ts";

function overlaps(input: string, diagonals: boolean) {
	const visits = new Map<string, number>();
	let intersections = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const [x1, y1, x2, y2] = line.match(/-?\d+/g)!.map(Number);
		const dx = Math.sign(x2 - x1),
			dy = Math.sign(y2 - y1);
		if (!diagonals && dx && dy) continue;
		const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
		for (let step = 0; step <= length; step++) {
			const point = [x1 + dx * step, y1 + dy * step].join(",");
			const count = (visits.get(point) ?? 0) + 1;
			visits.set(point, count);
			if (count === 2) intersections++;
		}
	}
	return intersections;
}

export const part1 = (input: string) => overlaps(input, false);
export const part2 = (input: string) => overlaps(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
