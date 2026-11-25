import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("uses the printed Sue number and the corrected comparisons", () => {
	const input =
		"Sue 9: cats: 7, trees: 3, goldfish: 5\nSue 2: cats: 8, trees: 4, goldfish: 4";
	expect(part1(input)).toBe(9);
	expect(part2(input)).toBe(2);
});
