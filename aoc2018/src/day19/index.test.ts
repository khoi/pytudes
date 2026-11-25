import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const example = `#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`;

test("loads and updates the bound instruction pointer", () => {
	expect(part1(example)).toBe(6);
	expect(part2("#ip 5\naddi 0 1 0")).toBe(2);
});

test("adds each divisor once, including the square root", () => {
	const program = `#ip 5
seti 9 0 2
seti 1 0 1
seti 1 0 3
mulr 1 3 4
eqrr 4 2 4
addr 4 5 5
addi 5 1 5
addr 0 1 0
addi 3 1 3
gtrr 3 2 4
addr 4 5 5
seti 2 0 5
addi 1 1 1
gtrr 1 2 4
addr 4 5 5
seti 1 0 5`;
	expect(part1(program)).toBe(13);
	expect(part2(program)).toBe(14);
});
