import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the XMAS encoding weakness", () => {
	const numbers =
		"35 20 15 25 47 40 62 55 65 95 102 117 150 182 127 219 299 277 309 576";
	expect(part1(numbers, 5)).toBe(127);
	expect(part2(numbers, 5)).toBe(62);
	expect(part1("20 1 40", 2)).toBe(40);
});
