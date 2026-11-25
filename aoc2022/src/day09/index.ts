import { run } from "../../../scripts/aoc.ts";

const directions: Record<string, [number, number]> = {
	U: [0, 1],
	D: [0, -1],
	L: [-1, 0],
	R: [1, 0],
};

function visited(input: string, length: number) {
	const knots = Array.from({ length }, () => ({ x: 0, y: 0 }));
	const positions = new Set(["0,0"]);
	for (const line of input.trim().split(/\r?\n/)) {
		const [dir, count] = line.split(" ");
		const [dx, dy] = directions[dir];
		for (let step = 0; step < Number(count); step++) {
			knots[0].x += dx;
			knots[0].y += dy;
			for (let i = 1; i < knots.length; i++) {
				const x = knots[i - 1].x - knots[i].x;
				const y = knots[i - 1].y - knots[i].y;
				if (Math.max(Math.abs(x), Math.abs(y)) <= 1) break;
				knots[i].x += Math.sign(x);
				knots[i].y += Math.sign(y);
			}
			const tail = knots.at(-1)!;
			positions.add([tail.x, tail.y].join(","));
		}
	}
	return positions.size;
}

export function part1(input: string) {
	return visited(input, 2);
}

export function part2(input: string) {
	return visited(input, 10);
}

if (import.meta.main) run(import.meta.url, part1, part2);
