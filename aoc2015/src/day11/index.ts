import { run } from "../../../scripts/aoc.ts";

const forbidden = new Set([8, 11, 14]);

function increment(letters: number[]): void {
	for (let i = letters.length - 1; i >= 0; i--) {
		letters[i] = (letters[i] + 1) % 26;
		if (letters[i] !== 0) break;
	}
	const blocked = letters.findIndex((letter) => forbidden.has(letter));
	if (blocked >= 0) {
		letters[blocked]++;
		letters.fill(0, blocked + 1);
	}
}

function valid(letters: number[]): boolean {
	const straight = letters.some(
		(letter, i) =>
			letters[i + 1] === letter + 1 && letters[i + 2] === letter + 2,
	);
	if (!straight) return false;
	const pairs = new Set<number>();
	for (let i = 1; i < letters.length; i++) {
		if (letters[i] === letters[i - 1]) {
			pairs.add(letters[i]);
			i++;
		}
	}
	return pairs.size >= 2;
}

export function part1(input: string): string {
	const letters = Array.from(input.trim(), (char) => char.charCodeAt(0) - 97);
	do {
		increment(letters);
	} while (!valid(letters));
	return String.fromCharCode(...letters.map((letter) => letter + 97));
}

export function part2(input: string): string {
	return part1(part1(input));
}

if (import.meta.main) run(import.meta.url, part1, part2);
