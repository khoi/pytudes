import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `3   4
4   3
2   5
1   3
3   9
3   3`;

test("pairs sorted lists and counts repeated locations", () => {
	expect(part1(sample)).toBe(11);
	expect(part2(sample)).toBe(31);
});
