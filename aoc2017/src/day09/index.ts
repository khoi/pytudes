import { run } from "../../../scripts/aoc.ts";

function parse(input: string) {
	let depth = 0;
	let score = 0;
	let garbage = 0;
	let insideGarbage = false;
	for (let i = 0; i < input.length; i++) {
		const char = input[i];
		if (insideGarbage) {
			if (char === "!") i++;
			else if (char === ">") insideGarbage = false;
			else garbage++;
		} else if (char === "<") insideGarbage = true;
		else if (char === "{") score += ++depth;
		else if (char === "}") depth--;
	}
	return { score, garbage };
}

export function part1(input: string): number {
	return parse(input).score;
}

export function part2(input: string): number {
	return parse(input).garbage;
}

if (import.meta.main) run(import.meta.url, part1, part2);
