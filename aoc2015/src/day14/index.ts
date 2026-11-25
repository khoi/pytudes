import { run } from "../../../scripts/aoc.ts";

interface Reindeer {
	speed: number;
	fly: number;
	rest: number;
}

function parse(input: string): Reindeer[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [speed, fly, rest] = line.match(/\d+/g)!.map(Number);
			return { speed, fly, rest };
		});
}

function distance({ speed, fly, rest }: Reindeer, seconds: number): number {
	const cycle = fly + rest;
	const flying =
		Math.floor(seconds / cycle) * fly + Math.min(fly, seconds % cycle);
	return speed * flying;
}

export function part1(input: string, seconds = 2503): number {
	return Math.max(
		...parse(input).map((reindeer) => distance(reindeer, seconds)),
	);
}

export function part2(input: string, seconds = 2503): number {
	const racers = parse(input);
	const scores = racers.map(() => 0);
	for (let t = 1; t <= seconds; t++) {
		const positions = racers.map((reindeer) => distance(reindeer, t));
		const lead = Math.max(...positions);
		for (const [i, position] of positions.entries()) {
			if (position === lead) scores[i]++;
		}
	}
	return Math.max(...scores);
}

if (import.meta.main) run(import.meta.url, part1, part2);
