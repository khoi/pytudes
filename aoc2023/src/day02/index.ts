import { run } from "../../../scripts/aoc.ts";

type Color = "red" | "green" | "blue";

function games(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [header, rounds] = line.split(":");
			const needed = { red: 0, green: 0, blue: 0 };
			for (const round of rounds.split(";")) {
				const counts = { red: 0, green: 0, blue: 0 };
				for (const cubes of round.split(",")) {
					const [count, color] = cubes.trim().split(" ");
					counts[color as Color] += Number(count);
				}
				for (const color of ["red", "green", "blue"] as const)
					needed[color] = Math.max(needed[color], counts[color]);
			}
			return { id: Number(header.split(" ")[1]), ...needed };
		});
}

export function part1(input: string) {
	return games(input).reduce(
		(sum, game) =>
			sum +
			(game.red <= 12 && game.green <= 13 && game.blue <= 14 ? game.id : 0),
		0,
	);
}

export function part2(input: string) {
	return games(input).reduce(
		(sum, game) => sum + game.red * game.green * game.blue,
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
