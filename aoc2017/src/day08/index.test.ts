import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("tracks the final and historical maxima separately", () => {
	const program =
		"b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10";
	expect(part1(program)).toBe(1);
	expect(part2(program)).toBe(10);
	expect(part1("a dec 1 if a == 0")).toBe(-1);
});
