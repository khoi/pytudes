import { run } from "../../../scripts/aoc.ts";

function distance(input: string, firstRepeat: boolean): number {
	let x = 0;
	let y = 0;
	let dx = 0;
	let dy = 1;
	const visited = new Set(["0,0"]);
	for (const step of input.trim().split(/,\s*/)) {
		[dx, dy] = step[0] === "R" ? [dy, -dx] : [-dy, dx];
		const blocks = Number(step.slice(1));
		for (let i = 0; i < blocks; i++) {
			x += dx;
			y += dy;
			if (firstRepeat) {
				const position = `${x},${y}`;
				if (visited.has(position)) return Math.abs(x) + Math.abs(y);
				visited.add(position);
			}
		}
	}
	if (firstRepeat) throw new Error("Path has no repeated location");
	return Math.abs(x) + Math.abs(y);
}

export const part1 = (input: string) => distance(input, false);
export const part2 = (input: string) => distance(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
