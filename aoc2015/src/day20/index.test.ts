import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the first house meeting the inclusive threshold", () => {
	expect(part1("10")).toBe(1);
	expect(part1("140")).toBe(8);
	expect(part1("150")).toBe(8);
	expect(part2("165")).toBe(8);
});
test("retires each elf after fifty deliveries", () => {
	const target = 10000;
	function presents(house: number): number {
		let sum = 0;
		for (let visit = 1; visit <= 50; visit++)
			if (house % visit === 0) sum += (11 * house) / visit;
		return sum;
	}
	let first = 1;
	while (presents(first) < target) first++;
	expect(part2(String(target))).toBe(first);
});
