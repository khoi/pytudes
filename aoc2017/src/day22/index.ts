import { run } from "../../../scripts/aoc.ts";

export function infections(
	input: string,
	bursts: number,
	evolved: boolean,
): number {
	const rows = input.trim().split(/\r?\n/);
	const stride = 2 * bursts + rows[0].length + 1;
	const directions = [-stride, 1, stride, -1];
	const nodes = new Map<number, number>();
	const centerX = Math.floor(rows[0].length / 2);
	const centerY = Math.floor(rows.length / 2);
	for (const [y, row] of rows.entries()) {
		for (let x = 0; x < row.length; x++) {
			if (row[x] === "#") nodes.set((y - centerY) * stride + x - centerX, 2);
		}
	}
	let position = 0;
	let heading = 0;
	let infected = 0;
	for (let i = 0; i < bursts; i++) {
		const state = nodes.get(position) ?? 0;
		heading = (heading + state + 3) % 4;
		const next = evolved ? (state + 1) % 4 : state ^ 2;
		if (next === 0) nodes.delete(position);
		else nodes.set(position, next);
		if (next === 2) infected++;
		position += directions[heading];
	}
	return infected;
}

export function part1(input: string): number {
	return infections(input, 10_000, false);
}

export function part2(input: string): number {
	return infections(input, 10_000_000, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
