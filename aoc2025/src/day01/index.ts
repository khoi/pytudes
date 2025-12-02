import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");
const DIAL_START = 50;

type Step = { dir: 1 | -1; dist: number };

function parseSteps(input: string): Step[] {
	return input.split("\n").map((line) => ({
		dir: line[0] === "R" ? 1 : -1,
		dist: Number(line.slice(1)),
	}));
}

function wrapDial(n: number): number {
	return ((n % 100) + 100) % 100;
}

export function part1(input: string): number {
	let pos = DIAL_START;
	let count = 0;

	for (const { dir, dist } of parseSteps(input)) {
		pos = wrapDial(pos + dir * dist);
		if (pos === 0) count++;
	}

	return count;
}

export function part2(input: string): number {
	let pos = DIAL_START;
	let count = 0;

	for (const { dir, dist } of parseSteps(input)) {
		if (dir === 1) {
			count += Math.floor((pos + dist) / 100);
		} else {
			count += Math.floor((dist + (pos === 0 ? 0 : 100 - pos)) / 100);
		}
		pos = wrapDial(pos + dir * dist);
	}

	return count;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
