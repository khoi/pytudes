import { run } from "../../../scripts/aoc.ts";

const names = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
];

function calibration(input: string, words: boolean) {
	let total = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const digits: number[] = [];
		for (let i = 0; i < line.length; i++) {
			if (/\d/.test(line[i])) digits.push(Number(line[i]));
			else if (words) {
				const digit = names.findIndex((name) => line.startsWith(name, i));
				if (digit >= 0) digits.push(digit + 1);
			}
		}
		if (!digits.length) throw new Error("Calibration line has no digits");
		total += 10 * digits[0] + digits[digits.length - 1];
	}
	return total;
}

export const part1 = (input: string) => calibration(input, false);
export const part2 = (input: string) => calibration(input, true);

if (import.meta.main) run(import.meta.url, part1, part2);
