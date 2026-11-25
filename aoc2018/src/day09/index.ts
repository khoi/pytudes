import { run } from "../../../scripts/aoc.ts";

function highScore(input: string, scale: number): number {
	const [players, last] = input.match(/\d+/g)!.map(Number);
	const limit = last * scale;
	const next = new Uint32Array(limit + 1);
	const prev = new Uint32Array(limit + 1);
	const scores = Array<number>(players).fill(0);
	let current = 0;
	for (let marble = 1; marble <= limit; marble++) {
		if (marble % 23 === 0) {
			for (let i = 0; i < 7; i++) current = prev[current];
			scores[(marble - 1) % players] += marble + current;
			next[prev[current]] = next[current];
			prev[next[current]] = prev[current];
			current = next[current];
		} else {
			const left = next[current];
			const right = next[left];
			next[left] = prev[right] = marble;
			next[marble] = right;
			prev[marble] = left;
			current = marble;
		}
	}
	return Math.max(...scores);
}

export function part1(input: string): number {
	return highScore(input, 1);
}

export function part2(input: string): number {
	return highScore(input, 100);
}

if (import.meta.main) run(import.meta.url, part1, part2);
