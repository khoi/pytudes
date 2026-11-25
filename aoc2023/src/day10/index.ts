import { run } from "../../../scripts/aoc.ts";

const directions = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0],
];
const pipes: Record<string, number[]> = {
	"|": [0, 2],
	"-": [1, 3],
	L: [0, 1],
	J: [0, 3],
	"7": [2, 3],
	F: [1, 2],
};

function loop(input: string) {
	const grid = input.trim().split(/\r?\n/);
	const sy = grid.findIndex((row) => row.includes("S"));
	const sx = grid[sy].indexOf("S");
	const exits = directions
		.map(([dx, dy], dir) =>
			pipes[grid[sy + dy]?.[sx + dx]]?.includes((dir + 2) % 4) ? dir : -1,
		)
		.filter((dir) => dir >= 0);
	if (exits.length !== 2) throw new Error("Start must connect to two pipes");
	let x = sx,
		y = sy,
		direction = exits[0],
		length = 0,
		twiceArea = 0;
	do {
		const [dx, dy] = directions[direction];
		const nx = x + dx,
			ny = y + dy;
		twiceArea += x * ny - nx * y;
		length++;
		x = nx;
		y = ny;
		if (x === sx && y === sy) break;
		const segment = pipes[grid[y]?.[x]];
		const incoming = (direction + 2) % 4;
		if (!segment?.includes(incoming)) throw new Error("Disconnected pipe");
		direction = segment.find((exit) => exit !== incoming)!;
	} while (true);
	return { length, twiceArea: Math.abs(twiceArea) };
}

export const part1 = (input: string) => loop(input).length / 2;

export function part2(input: string) {
	const { length, twiceArea } = loop(input);
	return (twiceArea - length) / 2 + 1;
}

if (import.meta.main) run(import.meta.url, part1, part2);
