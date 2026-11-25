import { run } from "../../../scripts/aoc.ts";
import { PriorityQueue } from "../../../scripts/priority-queue.ts";

type Bot = { x: number; y: number; z: number; r: number };
type Cube = {
	x: number;
	y: number;
	z: number;
	side: number;
	bots: Bot[];
	distance: number;
};
function parse(input: string): Bot[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [x, y, z, r] = line.match(/-?\d+/g)!.map(Number);
			return { x, y, z, r };
		});
}

export function part1(input: string) {
	const bots = parse(input);
	const strongest = bots.reduce((a, b) => (a.r >= b.r ? a : b));
	return bots.filter(
		(bot) =>
			Math.abs(bot.x - strongest.x) +
				Math.abs(bot.y - strongest.y) +
				Math.abs(bot.z - strongest.z) <=
			strongest.r,
	).length;
}

function distance(
	x: number,
	y: number,
	z: number,
	side: number,
	px: number,
	py: number,
	pz: number,
) {
	const span = side - 1;
	return (
		Math.max(0, x - px, px - x - span) +
		Math.max(0, y - py, py - y - span) +
		Math.max(0, z - pz, pz - z - span)
	);
}

export function part2(input: string) {
	const bots = parse(input);
	const min = (axis: "x" | "y" | "z") =>
		Math.min(...bots.map((bot) => bot[axis] - bot.r));
	const max = (axis: "x" | "y" | "z") =>
		Math.max(...bots.map((bot) => bot[axis] + bot.r));
	const x = min("x"),
		y = min("y"),
		z = min("z");
	const span = Math.max(max("x") - x, max("y") - y, max("z") - z);
	let side = 1;
	while (side <= span) side *= 2;
	const queue = new PriorityQueue<Cube>(
		(a, b) =>
			b.bots.length - a.bots.length ||
			a.distance - b.distance ||
			a.side - b.side,
	);
	queue.push({
		x,
		y,
		z,
		side,
		bots,
		distance: distance(x, y, z, side, 0, 0, 0),
	});
	while (queue.size) {
		const cube = queue.pop();
		if (cube.side === 1) return cube.distance;
		const half = cube.side / 2;
		for (const dx of [0, half])
			for (const dy of [0, half])
				for (const dz of [0, half]) {
					const x = cube.x + dx,
						y = cube.y + dy,
						z = cube.z + dz;
					const bots = cube.bots.filter(
						(bot) => distance(x, y, z, half, bot.x, bot.y, bot.z) <= bot.r,
					);
					if (bots.length)
						queue.push({
							x,
							y,
							z,
							side: half,
							bots,
							distance: distance(x, y, z, half, 0, 0, 0),
						});
				}
	}
	throw new Error("No location is in range");
}

if (import.meta.main) run(import.meta.url, part1, part2);
