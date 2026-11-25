import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

const steps = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0],
];
const arrows = "^>v<";

function scaffold(grid: string[], x: number, y: number) {
	const tile = grid[y]?.[x];
	return tile === "#" || (tile !== undefined && arrows.includes(tile));
}

function camera(input: string) {
	return new Intcode(input)
		.run()
		.map((code) => String.fromCharCode(code))
		.join("")
		.trim()
		.split("\n");
}

export function alignment(grid: string[]) {
	let sum = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (
				scaffold(grid, x, y) &&
				steps.every(([dx, dy]) => scaffold(grid, x + dx, y + dy))
			)
				sum += x * y;
		}
	}
	return sum;
}

function compress(
	path: string[],
	index = 0,
	main: string[] = [],
	routines: string[][] = [],
): string[] | undefined {
	if (index === path.length) {
		const lines = routines.map((routine) => routine.join(","));
		while (lines.length < 3) lines.push(lines[0]);
		return [main.join(","), ...lines];
	}
	if (main.length >= 10) return;
	for (const [i, routine] of routines.entries()) {
		if (routine.every((move, n) => path[index + n] === move)) {
			const result = compress(
				path,
				index + routine.length,
				[...main, "ABC"[i]],
				routines,
			);
			if (result) return result;
		}
	}
	if (routines.length === 3) return;
	for (let end = Math.min(path.length, index + 5); end > index; end--) {
		const routine = path.slice(index, end);
		if (routine.join(",").length > 20) continue;
		const result = compress(
			path,
			end,
			[...main, "ABC"[routines.length]],
			[...routines, routine],
		);
		if (result) return result;
	}
}

export function movement(grid: string[]) {
	const width = Math.max(...grid.map((row) => row.length));
	const total = grid
		.join("")
		.split("")
		.filter((tile) => tile === "#" || arrows.includes(tile)).length;
	const y = grid.findIndex((row) =>
		[...row].some((tile) => arrows.includes(tile)),
	);
	if (y < 0) throw new Error("Robot is missing");
	const x = [...grid[y]].findIndex((tile) => arrows.includes(tile));
	const ancestors = new Set<string>();
	function visit(
		x: number,
		y: number,
		facing: number,
		visited: Set<number>,
		path: string[],
	): string[] | undefined {
		if (visited.size === total && path.length) {
			const result = compress(path);
			if (result) return result;
		}
		if (path.length === 50) return;
		const state = [x, y, facing, visited.size].join(",");
		if (ancestors.has(state)) return;
		ancestors.add(state);
		for (const [turn, offset] of [
			["L", 3],
			["R", 1],
		] as const) {
			const direction = (facing + offset) % 4;
			const [dx, dy] = steps[direction];
			const reach = new Set(visited);
			const stops: { length: number; visited: Set<number> }[] = [];
			for (let length = 1; ; length++) {
				const nx = x + length * dx;
				const ny = y + length * dy;
				if (!scaffold(grid, nx, ny)) break;
				reach.add(ny * width + nx);
				if (
					reach.size === total ||
					scaffold(grid, nx - dy, ny + dx) ||
					scaffold(grid, nx + dy, ny - dx)
				) {
					stops.push({ length, visited: new Set(reach) });
				}
			}
			for (const stop of stops.reverse()) {
				const result = visit(
					x + dx * stop.length,
					y + dy * stop.length,
					direction,
					stop.visited,
					[...path, turn + "," + stop.length],
				);
				if (result) return result;
			}
		}
		ancestors.delete(state);
	}
	const routine = visit(
		x,
		y,
		arrows.indexOf(grid[y][x]),
		new Set([y * width + x]),
		[],
	);
	if (!routine) throw new Error("No encodable path covers the scaffold");
	return routine;
}

export function part1(input: string) {
	return alignment(camera(input));
}

export function part2(input: string) {
	const lines = [...movement(camera(input)), "n", ""].join("\n");
	const machine = new Intcode(input);
	machine.set(0, 2);
	const dust = machine
		.run(Array.from(lines, (char) => char.charCodeAt(0)))
		.at(-1);
	if (dust === undefined || dust <= 255)
		throw new Error("Vacuum robot rejected its movement program");
	return dust;
}

if (import.meta.main) run(import.meta.url, part1, part2);
