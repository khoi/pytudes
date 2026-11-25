import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

const moves = [
	[1, 0, -1],
	[2, 0, 1],
	[3, -1, 0],
	[4, 1, 0],
];

interface Droid {
	clone(): Droid;
	run(inputs: number[]): number[];
}

export function explore(start: Droid) {
	const queue = [{ x: 0, y: 0, steps: 0, droid: start }];
	const open = new Set(["0,0"]);
	const seen = new Set(open);
	let oxygen: { x: number; y: number; steps: number } | undefined;

	for (let i = 0; i < queue.length; i++) {
		const { x, y, steps, droid } = queue[i];
		for (const [command, dx, dy] of moves) {
			const key = [x + dx, y + dy].join(",");
			if (seen.has(key)) continue;
			seen.add(key);
			const next = droid.clone();
			const [status] = next.run([command]);
			if (status === 0) continue;
			if (status !== 1 && status !== 2)
				throw new Error("Unexpected droid status");
			const position = { x: x + dx, y: y + dy, steps: steps + 1 };
			open.add(key);
			queue.push({ ...position, droid: next });
			if (status === 2) oxygen = position;
		}
	}
	if (!oxygen) throw new Error("Oxygen system is unreachable");
	const fill = [{ x: oxygen.x, y: oxygen.y, minutes: 0 }];
	open.delete([oxygen.x, oxygen.y].join(","));
	for (let i = 0; i < fill.length; i++) {
		const { x, y, minutes } = fill[i];
		for (const [, dx, dy] of moves) {
			if (open.delete([x + dx, y + dy].join(","))) {
				fill.push({ x: x + dx, y: y + dy, minutes: minutes + 1 });
			}
		}
	}
	return { distance: oxygen.steps, minutes: fill.at(-1)!.minutes };
}

export function part1(input: string) {
	return explore(new Intcode(input)).distance;
}

export function part2(input: string) {
	return explore(new Intcode(input)).minutes;
}

if (import.meta.main) run(import.meta.url, part1, part2);
