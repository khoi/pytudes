import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

test("future crossings and exact rock trajectory", () => {
	expect(part1(sample, 7, 27)).toBe(2);
	expect(part2(sample)).toBe(47n);
	expect(part1("5, 0, 1 @ 0, 1, 0\n0, 5, 2 @ 1, 0, 0", 5, 5)).toBe(1);
});
