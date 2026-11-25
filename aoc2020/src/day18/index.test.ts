import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the two precedence rules with nested parentheses", () => {
	const expressions =
		"1 + 2 * 3 + 4 * 5 + 6\n5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))";
	expect(part1(expressions)).toBe(71 + 12240);
	expect(part2(expressions)).toBe(231 + 669060);
});
