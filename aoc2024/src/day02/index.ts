import { run } from "../../../scripts/aoc.ts";

function reports(input: string): number[][] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(/\s+/).map(Number));
}

function isSafe(
	levels: number[],
	direction: number,
	allowRemoval: boolean,
): boolean {
	for (let i = 1; i < levels.length; i++) {
		const change = (levels[i] - levels[i - 1]) * direction;
		if (change >= 1 && change <= 3) continue;
		return (
			allowRemoval &&
			[i - 1, i].some((skip) =>
				isSafe(
					levels.filter((_, index) => index !== skip),
					direction,
					false,
				),
			)
		);
	}
	return true;
}

function countSafe(input: string, allowRemoval: boolean): number {
	return reports(input).filter(
		(levels) =>
			isSafe(levels, 1, allowRemoval) || isSafe(levels, -1, allowRemoval),
	).length;
}

export function part1(input: string): number {
	return countSafe(input, false);
}

export function part2(input: string): number {
	return countSafe(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
