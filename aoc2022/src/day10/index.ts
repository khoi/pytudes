import { run } from "../../../scripts/aoc.ts";

import { decodeLetters } from "../../../scripts/ocr.ts";

function* cycles(input: string) {
	let register = 1;
	for (const instruction of input.trim().split(/\r?\n/)) {
		yield register;
		if (instruction.startsWith("addx ")) {
			yield register;
			register += Number(instruction.slice(5));
		}
	}
}

export function part1(input: string) {
	let signal = 0;
	let cycle = 0;
	for (const register of cycles(input)) {
		cycle++;
		if (cycle % 40 === 20) signal += cycle * register;
	}
	return signal;
}

export function part2(input: string) {
	const rows: string[] = [];
	let pixel = 0;
	for (const register of cycles(input)) {
		const column = pixel % 40;
		if (column === 0) rows.push("");
		rows[rows.length - 1] += Math.abs(register - column) <= 1 ? "#" : ".";
		pixel++;
	}
	return decodeLetters(rows);
}

if (import.meta.main) run(import.meta.url, part1, part2);
