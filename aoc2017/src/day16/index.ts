import { run } from "../../../scripts/aoc.ts";

export function dance(input: string, size: number, rounds: number): string {
	let line = Array.from({ length: size }, (_, i) =>
		String.fromCharCode(97 + i),
	);
	const moves = input.trim().split(",");
	const history: string[] = [];
	const seen = new Map<string, number>();
	for (let round = 0; round < rounds; round++) {
		const state = line.join("");
		const previous = seen.get(state);
		if (previous !== undefined) {
			return history[previous + ((rounds - round) % (round - previous))];
		}
		seen.set(state, round);
		history.push(state);
		for (const move of moves) {
			const [a, b] = move.slice(1).split("/");
			if (move[0] === "s") {
				const cut = size - (Number(a) % size);
				line = [...line.slice(cut), ...line.slice(0, cut)];
			} else {
				const left = move[0] === "x" ? Number(a) : line.indexOf(a);
				const right = move[0] === "x" ? Number(b) : line.indexOf(b);
				[line[left], line[right]] = [line[right], line[left]];
			}
		}
	}
	return line.join("");
}

export function part1(input: string): string {
	return dance(input, 16, 1);
}

export function part2(input: string): string {
	return dance(input, 16, 1_000_000_000);
}

if (import.meta.main) run(import.meta.url, part1, part2);
