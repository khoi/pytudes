import { readFileSync } from "node:fs";

const input = readFileSync(new URL("./input.txt", import.meta.url), "utf-8");

function parse(input: string): number[][] {
	return input.split("\n").map((line) => line.split("").map(Number));
}

function dp(bank: number[], k: number): number {
	const n = bank.length;
	let prevSuffix = new Array(n + 1).fill(-Infinity);
	for (let i = n - 1; i >= 0; i--) {
		prevSuffix[i] = Math.max(prevSuffix[i + 1], bank[i]);
	}
	for (let d = 2; d <= k; d++) {
		const multiplier = 10 ** (d - 1);
		const currSuffix = new Array(n + 1).fill(-Infinity);
		for (let i = n - 1; i >= 0; i--) {
			currSuffix[i] = Math.max(
				currSuffix[i + 1],
				bank[i] * multiplier + prevSuffix[i + 1],
			);
		}
		prevSuffix = currSuffix;
	}

	return prevSuffix[0];
}

export function part1(str: string): number {
	const banks = parse(str);
	return banks.reduce((sum, bank) => sum + dp(bank, 2), 0);
}

export function part2(str: string): number {
	const banks = parse(str);
	return banks.reduce((sum, bank) => sum + dp(bank, 12), 0);
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
