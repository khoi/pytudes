import { run } from "../../../scripts/aoc.ts";

function onesInColumn(values: string[], column: number) {
	return values.reduce((ones, row) => ones + Number(row[column]), 0);
}

export function part1(input: string) {
	const values = input.trim().split(/\s+/);
	let gamma = 0,
		epsilon = 0;
	for (let column = 0; column < values[0].length; column++) {
		const bit = Number(onesInColumn(values, column) * 2 >= values.length);
		gamma = gamma * 2 + bit;
		epsilon = epsilon * 2 + 1 - bit;
	}
	return gamma * epsilon;
}

function rating(values: string[], keepMost: boolean) {
	for (
		let column = 0;
		values.length > 1 && column < values[0].length;
		column++
	) {
		const ones = onesInColumn(values, column);
		const zeros = values.length - ones;
		if (ones === 0 || zeros === 0) continue;
		const keep = ones >= zeros === keepMost ? "1" : "0";
		values = values.filter((value) => value[column] === keep);
	}
	return parseInt(values[0], 2);
}

export function part2(input: string) {
	const values = input.trim().split(/\s+/);
	return rating(values, true) * rating(values, false);
}

if (import.meta.main) run(import.meta.url, part1, part2);
