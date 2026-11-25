import { run } from "../../../scripts/aoc.ts";

function resourceValue(input: string, minutes: number) {
	let acres = input.trim().split(/\r?\n/);
	const seen = new Map<string, number>();
	for (let minute = 0; minute < minutes; minute++) {
		const key = acres.join("\n");
		const previous = seen.get(key);
		if (previous !== undefined) {
			const period = minute - previous;
			minute += Math.floor((minutes - minute) / period) * period;
			if (minute === minutes) break;
		}
		seen.set(key, minute);
		acres = acres.map((row, y) =>
			Array.from(row, (cell, x) => {
				let woods = 0,
					yards = 0;
				for (let dy = -1; dy <= 1; dy++)
					for (let dx = -1; dx <= 1; dx++) {
						if (dx === 0 && dy === 0) continue;
						const neighbor = acres[y + dy]?.[x + dx];
						if (neighbor === "|") woods++;
						if (neighbor === "#") yards++;
					}
				if (cell === ".") return woods >= 3 ? "|" : ".";
				if (cell === "|") return yards >= 3 ? "#" : "|";
				return woods && yards ? "#" : ".";
			}).join(""),
		);
	}
	const landscape = acres.join("");
	return (
		(landscape.match(/\|/g)?.length ?? 0) * (landscape.match(/#/g)?.length ?? 0)
	);
}

export const part1 = (input: string) => resourceValue(input, 10);
export const part2 = (input: string) => resourceValue(input, 1_000_000_000);

if (import.meta.main) run(import.meta.url, part1, part2);
