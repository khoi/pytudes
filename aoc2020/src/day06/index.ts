import { run } from "../../../scripts/aoc.ts";

function groups(input: string) {
	return input
		.trim()
		.split(/\r?\n\s*\n/)
		.map((group) => group.split(/\s+/));
}

export function part1(input: string) {
	return groups(input).reduce(
		(sum, answers) => sum + new Set(answers.join("")).size,
		0,
	);
}

export function part2(input: string) {
	return groups(input).reduce((sum, answers) => {
		const shared = [...new Set(answers[0])].filter((letter) =>
			answers.every((answer) => answer.includes(letter)),
		);
		return sum + shared.length;
	}, 0);
}

if (import.meta.main) run(import.meta.url, part1, part2);
