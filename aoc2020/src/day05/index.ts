import { run } from "../../../scripts/aoc.ts";

function seatIds(input: string) {
	return input
		.trim()
		.split(/\s+/)
		.map((pass) =>
			Number.parseInt(pass.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2),
		);
}

export function part1(input: string) {
	return Math.max(...seatIds(input));
}

export function part2(input: string) {
	const ids = seatIds(input).sort((a, b) => a - b);
	for (let i = 1; i < ids.length; i++) {
		if (ids[i] - ids[i - 1] === 2) return ids[i] - 1;
	}
	throw new Error("No missing seat with occupied neighbors");
}

if (import.meta.main) run(import.meta.url, part1, part2);
