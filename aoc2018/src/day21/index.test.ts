import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("compares register zero with each distinct halting value", () => {
	const input = `#ip 5
addi 2 1 2
bani 2 3 2
eqrr 2 0 3
addr 3 5 5
seti -1 0 5`;
	expect(part1(input)).toBe(1);
	expect(part2(input)).toBe(0);
});

test("division loop skips complete blocks and preserves its quotient", () => {
	const input = `#ip 5
seti 100000001 0 1
seti 0 0 2
addi 2 1 3
muli 3 256 3
gtrr 3 1 3
addr 5 3 5
addi 5 1 5
seti 9 0 5
addi 2 1 2
seti 1 0 5
setr 2 0 1
eqrr 1 0 3`;
	expect(part1(input)).toBe(390625);
	expect(part2(input)).toBe(390625);
});
