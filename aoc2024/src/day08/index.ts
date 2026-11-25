import { run } from "../../../scripts/aoc.ts";

function gcd(a: number, b: number): number {
	while (b > 0) [a, b] = [b, a % b];
	return a;
}

function antinodes(input: string, resonant: boolean): number {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length;
	const antennas = new Map<string, [number, number][]>();
	for (const [y, row] of rows.entries()) {
		for (let x = 0; x < width; x++) {
			if (row[x] === ".") continue;
			if (!antennas.has(row[x])) antennas.set(row[x], []);
			antennas.get(row[x])!.push([x, y]);
		}
	}
	const marked = new Set<number>();
	function markRay(x: number, y: number, dx: number, dy: number) {
		while (x >= 0 && x < width && y >= 0 && y < rows.length) {
			marked.add(y * width + x);
			if (!resonant) break;
			x += dx;
			y += dy;
		}
	}
	for (const group of antennas.values()) {
		for (let i = 0; i < group.length; i++) {
			const [x, y] = group[i];
			for (const [u, v] of group.slice(i + 1)) {
				const dx = u - x;
				const dy = v - y;
				if (resonant) {
					const divisor = gcd(Math.abs(dx), Math.abs(dy));
					const stepX = dx / divisor;
					const stepY = dy / divisor;
					markRay(x, y, stepX, stepY);
					markRay(x - stepX, y - stepY, -stepX, -stepY);
				} else {
					markRay(x - dx, y - dy, -dx, -dy);
					markRay(u + dx, v + dy, dx, dy);
				}
			}
		}
	}
	return marked.size;
}

export function part1(input: string): number {
	return antinodes(input, false);
}

export function part2(input: string): number {
	return antinodes(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
