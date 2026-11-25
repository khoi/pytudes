import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

const quine = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;

test("runs the register machine and reconstructs a quine", () => {
	expect(part1(sample)).toBe("4,6,3,5,6,3,5,2,1,0");
	expect(part2(quine)).toBe(117440n);
});
