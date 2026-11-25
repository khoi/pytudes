import { run } from "../../../scripts/aoc.ts";

function entries(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const match = /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/.exec(line);
			if (!match) throw new Error("Invalid password policy");
			const [, low, high, letter, password] = match;
			return { low: Number(low), high: Number(high), letter, password };
		});
}

export function part1(input: string) {
	return entries(input).filter(({ low, high, letter, password }) => {
		const count = password.split(letter).length - 1;
		return low <= count && count <= high;
	}).length;
}

export function part2(input: string) {
	return entries(input).filter(
		({ low, high, letter, password }) =>
			(password[low - 1] === letter) !== (password[high - 1] === letter),
	).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
