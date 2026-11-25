import { run } from "../../../scripts/aoc.ts";

export function safeTiles(input: string, rows: number) {
	const first = input.trim();
	let previous = new Uint8Array(first.length + 2);
	let next = new Uint8Array(previous.length);
	for (let i = 0; i < first.length; i++)
		previous[i + 1] = Number(first[i] === "^");
	let safe = 0;
	for (let row = 0; row < rows; row++) {
		for (let i = 1; i <= first.length; i++) {
			safe += 1 - previous[i];
			next[i] = previous[i - 1] ^ previous[i + 1];
		}
		[previous, next] = [next, previous];
	}
	return safe;
}

export function part1(input: string) {
	return safeTiles(input, 40);
}

export function part2(input: string) {
	return safeTiles(input, 400_000);
}

if (import.meta.main) run(import.meta.url, part1, part2);
