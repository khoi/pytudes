import { run } from "../../../scripts/aoc.ts";

function navigate(input: string) {
	let horizontal = 0,
		aim = 0,
		depth = 0;
	for (const line of input.trim().split(/\r?\n/)) {
		const [command, amount] = line.split(" ");
		const distance = Number(amount);
		switch (command) {
			case "forward":
				horizontal += distance;
				depth += aim * distance;
				break;
			case "up":
				aim -= distance;
				break;
			case "down":
				aim += distance;
				break;
			default:
				throw new Error("Unknown course command: " + command);
		}
	}
	return { horizontal, aim, depth };
}

export function part1(input: string) {
	const { horizontal, aim } = navigate(input);
	return horizontal * aim;
}

export function part2(input: string) {
	const { horizontal, depth } = navigate(input);
	return horizontal * depth;
}

if (import.meta.main) run(import.meta.url, part1, part2);
