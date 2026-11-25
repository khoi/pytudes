import { run } from "../../../scripts/aoc.ts";

function count(input: string, exactPair: boolean): number {
	const [lower, upper] = input.trim().split("-").map(Number);
	let total = 0;
	for (
		let code = Math.max(lower, 100000);
		code <= Math.min(upper, 999999);
		code++
	) {
		const digits = String(code);
		let streak = 1,
			pair = false,
			decreasing = false;
		for (let i = 1; i <= digits.length; i++) {
			if (i < digits.length && digits[i] < digits[i - 1]) {
				decreasing = true;
				break;
			}
			if (digits[i] === digits[i - 1]) streak++;
			else {
				pair ||= exactPair ? streak === 2 : streak >= 2;
				streak = 1;
			}
		}
		if (pair && !decreasing) total++;
	}
	return total;
}

export const part1 = (input: string) => count(input, false);
export const part2 = (input: string) => count(input, true);
if (import.meta.main) run(import.meta.url, part1, part2);
