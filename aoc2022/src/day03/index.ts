import { run } from "../../../scripts/aoc.ts";

function commonPriority(first: string, ...others: string[]) {
	for (const item of first) {
		if (others.every((group) => group.includes(item))) {
			const code = item.charCodeAt(0);
			return code >= 97 ? code - 96 : code - 38;
		}
	}
	throw new Error("No common item");
}

export function part1(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.reduce((sum, sack) => {
			const middle = sack.length / 2;
			return sum + commonPriority(sack.slice(0, middle), sack.slice(middle));
		}, 0);
}

export function part2(input: string) {
	const sacks = input.trim().split(/\r?\n/);
	let total = 0;
	for (let i = 0; i < sacks.length; i += 3) {
		total += commonPriority(sacks[i], sacks[i + 1], sacks[i + 2]);
	}
	return total;
}

if (import.meta.main) run(import.meta.url, part1, part2);
