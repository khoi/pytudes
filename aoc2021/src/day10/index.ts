import { run } from "../../../scripts/aoc.ts";

const opens = "([{<";
const closes = ")]}>";
const penalties = [3, 57, 1197, 25137];

function check(line: string) {
	const stack: number[] = [];
	for (const char of line) {
		const opening = opens.indexOf(char);
		if (opening !== -1) stack.push(opening);
		else {
			const closing = closes.indexOf(char);
			if (stack.pop() !== closing)
				return { penalty: penalties[closing], completion: 0 };
		}
	}
	const completion = stack
		.reverse()
		.reduce((score, bracket) => score * 5 + bracket + 1, 0);
	return { penalty: 0, completion };
}

export function part1(input: string) {
	return input
		.trim()
		.split(/\s+/)
		.reduce((sum, line) => sum + check(line).penalty, 0);
}

export function part2(input: string) {
	const scores = input
		.trim()
		.split(/\s+/)
		.map((line) => check(line).completion)
		.filter((score) => score > 0)
		.sort((a, b) => a - b);
	return scores[Math.floor(scores.length / 2)];
}

if (import.meta.main) run(import.meta.url, part1, part2);
