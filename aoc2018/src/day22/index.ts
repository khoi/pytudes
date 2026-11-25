import { run } from "../../../scripts/aoc.ts";
import { PriorityQueue } from "../../../scripts/priority-queue.ts";

type Tool = "torch" | "climbing gear" | "neither";
const allowedTools: [Tool, Tool][] = [
	["torch", "climbing gear"],
	["climbing gear", "neither"],
	["torch", "neither"],
];

function cave(input: string) {
	const [depth, targetX, targetY] = input.match(/\d+/g)!.map(Number);
	const cache: number[][] = [];
	function erosion(x: number, y: number): number {
		cache[y] ??= [];
		const row = cache[y];
		if (row[x] !== undefined) return row[x];
		let geologic: number;
		if (x === targetX && y === targetY) geologic = 0;
		else if (y === 0) geologic = x * 16807;
		else if (x === 0) geologic = y * 48271;
		else geologic = erosion(x - 1, y) * erosion(x, y - 1);
		row[x] = (geologic + depth) % 20183;
		return row[x];
	}
	return {
		targetX,
		targetY,
		region: (x: number, y: number) => erosion(x, y) % 3,
	};
}

export function part1(input: string) {
	const { targetX, targetY, region } = cave(input);
	let risk = 0;
	for (let y = 0; y <= targetY; y++)
		for (let x = 0; x <= targetX; x++) risk += region(x, y);
	return risk;
}

export function part2(input: string) {
	const { targetX, targetY, region } = cave(input);
	const visited = new Map<string, number>();
	type Step = {
		x: number;
		y: number;
		tool: Tool;
		minutes: number;
		estimate: number;
	};
	const queue = new PriorityQueue<Step>((a, b) => a.estimate - b.estimate);
	function enqueue(x: number, y: number, tool: Tool, minutes: number) {
		const key = `${x},${y},${tool}`;
		if ((visited.get(key) ?? Infinity) <= minutes) return;
		visited.set(key, minutes);
		const remaining =
			Math.abs(targetX - x) +
			Math.abs(targetY - y) +
			(tool === "torch" ? 0 : 7);
		queue.push({ x, y, tool, minutes, estimate: minutes + remaining });
	}
	enqueue(0, 0, "torch", 0);
	while (queue.size) {
		const { x, y, tool, minutes } = queue.pop();
		if (x === targetX && y === targetY && tool === "torch") return minutes;
		if (visited.get(`${x},${y},${tool}`)! < minutes) continue;
		const [first, second] = allowedTools[region(x, y)];
		enqueue(x, y, tool === first ? second : first, minutes + 7);
		for (const [nx, ny] of [
			[x + 1, y],
			[x - 1, y],
			[x, y + 1],
			[x, y - 1],
		]) {
			if (nx >= 0 && ny >= 0 && allowedTools[region(nx, ny)].includes(tool))
				enqueue(nx, ny, tool, minutes + 1);
		}
	}
	throw new Error("No path to the target");
}

if (import.meta.main) run(import.meta.url, part1, part2);
