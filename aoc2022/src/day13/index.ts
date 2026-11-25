import { run } from "../../../scripts/aoc.ts";

type Packet = number | Packet[];

function compare(left: Packet, right: Packet): number {
	if (typeof left === "number" && typeof right === "number")
		return left - right;
	const a = Array.isArray(left) ? left : [left];
	const b = Array.isArray(right) ? right : [right];
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		const order = compare(a[i], b[i]);
		if (order !== 0) return order;
	}
	return a.length - b.length;
}

function packets(input: string): Packet[] {
	return input
		.trim()
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => JSON.parse(line));
}

export function part1(input: string) {
	const list = packets(input);
	let sum = 0;
	for (let i = 0; i < list.length; i += 2) {
		if (compare(list[i], list[i + 1]) < 0) sum += i / 2 + 1;
	}
	return sum;
}

export function part2(input: string) {
	const a = [[2]];
	const b = [[6]];
	const sorted = [...packets(input), a, b].sort(compare);
	return (sorted.indexOf(a) + 1) * (sorted.indexOf(b) + 1);
}

if (import.meta.main) run(import.meta.url, part1, part2);
