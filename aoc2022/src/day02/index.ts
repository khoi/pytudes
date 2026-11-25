import { run } from "../../../scripts/aoc.ts";

function totalScore(
	input: string,
	choose: (opponent: number, code: number) => number,
) {
	return input
		.trim()
		.split(/\r?\n/)
		.reduce((total, round) => {
			const [left, right] = round.split(" ");
			const opponent = "ABC".indexOf(left);
			const player = choose(opponent, "XYZ".indexOf(right));
			const outcome = (player - opponent + 4) % 3;
			return total + player + 1 + 3 * outcome;
		}, 0);
}

export function part1(input: string) {
	return totalScore(input, (_, shape) => shape);
}

export function part2(input: string) {
	return totalScore(input, (opponent, outcome) => (opponent + outcome + 2) % 3);
}

if (import.meta.main) run(import.meta.url, part1, part2);
