import { run } from "../../../scripts/aoc.ts";

function decks(input: string): number[][] {
	return input
		.trim()
		.split(/\r?\n\r?\n/)
		.map((section) => section.split(/\r?\n/).slice(1).map(Number));
}

function play(first: number[], second: number[], recursive: boolean): boolean {
	const seen = new Set<string>();
	while (first.length && second.length) {
		if (recursive) {
			const state = first.join(",") + ";" + second.join(",");
			if (seen.has(state)) return true;
			seen.add(state);
		}
		const a = first.shift()!;
		const b = second.shift()!;
		const firstWins =
			recursive && first.length >= a && second.length >= b
				? play(first.slice(0, a), second.slice(0, b), true)
				: a > b;
		if (firstWins) first.push(a, b);
		else second.push(b, a);
	}
	return first.length > 0;
}

function score(input: string, recursive: boolean): number {
	const [first, second] = decks(input);
	const deck = play(first, second, recursive) ? first : second;
	return deck.reduce((sum, card, i) => sum + card * (deck.length - i), 0);
}

export function part1(input: string): number {
	return score(input, false);
}

export function part2(input: string): number {
	return score(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
