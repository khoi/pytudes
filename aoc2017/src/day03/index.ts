import { run } from "../../../scripts/aoc.ts";

export function part1(input: string): number {
	const square = Number(input.trim());
	if (square === 1) return 0;
	const ring = Math.ceil((Math.sqrt(square) - 1) / 2);
	const corner = (2 * ring + 1) ** 2;
	return ring + Math.abs(((corner - square) % (2 * ring)) - ring);
}

export function part2(input: string): number {
	const limit = Number(input.trim());
	const values = new Map([["0,0", 1]]);
	let x = 0;
	let y = 0;
	let dx = 1;
	let dy = 0;
	for (let length = 1; ; length++) {
		for (let side = 0; side < 2; side++) {
			for (let step = 0; step < length; step++) {
				x += dx;
				y += dy;
				let sum = 0;
				for (let i = x - 1; i <= x + 1; i++) {
					for (let j = y - 1; j <= y + 1; j++)
						sum += values.get(`${i},${j}`) ?? 0;
				}
				if (sum > limit) return sum;
				values.set(`${x},${y}`, sum);
			}
			[dx, dy] = [-dy, dx];
		}
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
