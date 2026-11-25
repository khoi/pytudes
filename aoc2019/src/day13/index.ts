import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function play(input: string, free: boolean) {
	const machine = new Intcode(input);
	if (free) machine.set(0, 2);
	const tiles = new Map<string, number>();
	let paddle = 0,
		ball = 0,
		score = 0;
	let output = machine.run();
	while (true) {
		if (output.length % 3) throw new Error("Incomplete tile update");
		for (let i = 0; i < output.length; i += 3) {
			const [x, y, tile] = [output[i], output[i + 1], output[i + 2]];
			if (x === -1 && y === 0) score = tile;
			else {
				tiles.set(`${x},${y}`, tile);
				if (tile === 3) paddle = x;
				if (tile === 4) ball = x;
			}
		}
		if (machine.halted) break;
		output = machine.run([Math.sign(ball - paddle)]);
	}
	return { score, tiles };
}

export const part1 = (input: string) =>
	[...play(input, false).tiles.values()].filter((tile) => tile === 2).length;
export const part2 = (input: string) => play(input, true).score;
if (import.meta.main) run(import.meta.url, part1, part2);
