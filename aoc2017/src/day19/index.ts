import { run } from "../../../scripts/aoc.ts";

function trace(input: string): { letters: string; steps: number } {
	const rows = input.split(/\r?\n/);
	function tile(x: number, y: number): string {
		return rows[y]?.[x] ?? " ";
	}
	let x = rows[0].indexOf("|");
	let y = 0;
	let dx = 0;
	let dy = 1;
	let letters = "";
	let steps = 0;
	while (tile(x, y) !== " ") {
		const current = tile(x, y);
		if (/[A-Z]/.test(current)) letters += current;
		if (current === "+") {
			const next = dy === 0 ? [0, 1] : [1, 0];
			const sign = tile(x + next[0], y + next[1]) === " " ? -1 : 1;
			dx = sign * next[0];
			dy = sign * next[1];
		}
		x += dx;
		y += dy;
		steps++;
	}
	return { letters, steps };
}

export function part1(input: string): string {
	return trace(input).letters;
}

export function part2(input: string): number {
	return trace(input).steps;
}

if (import.meta.main) run(import.meta.url, part1, part2);
