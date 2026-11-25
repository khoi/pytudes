import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

test("calibrates using left-to-right arithmetic", () => {
	expect(part1(sample)).toBe(3749n);
	expect(part2(sample)).toBe(11387n);
});

test("allows multiplication by zero to reset a large subtotal", () => {
	expect(part1("5: 100 100 0 5")).toBe(5n);
});
