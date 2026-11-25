import { run } from "../../../scripts/aoc.ts";

function entries(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(" | ").map((words) => words.split(" ")));
}

export function part1(input: string) {
	return entries(input).reduce(
		(sum, [, output]) =>
			sum + output.filter((word) => [2, 3, 4, 7].includes(word.length)).length,
		0,
	);
}

function segments(word: string) {
	return [...word].reduce(
		(mask, letter) => mask | (1 << (letter.charCodeAt(0) - 97)),
		0,
	);
}

function decode(patterns: string[], output: string[]) {
	const byLength = (n: number) =>
		patterns.filter((p) => p.length === n).map(segments);
	const digit: number[] = [];
	[digit[1]] = byLength(2);
	[digit[7]] = byLength(3);
	[digit[4]] = byLength(4);
	[digit[8]] = byLength(7);
	const includes = (all: number, subset: number) => (all & subset) === subset;
	for (const mask of byLength(6)) {
		if (includes(mask, digit[4])) digit[9] = mask;
		else if (includes(mask, digit[1])) digit[0] = mask;
		else digit[6] = mask;
	}
	for (const mask of byLength(5)) {
		if (includes(mask, digit[1])) digit[3] = mask;
		else if (includes(digit[6], mask)) digit[5] = mask;
		else digit[2] = mask;
	}
	return output.reduce((n, word) => n * 10 + digit.indexOf(segments(word)), 0);
}

export function part2(input: string) {
	return entries(input).reduce(
		(sum, [patterns, output]) => sum + decode(patterns, output),
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
