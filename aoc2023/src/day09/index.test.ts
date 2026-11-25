import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("history extrapolation", () => {
	const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
	expect(part1(input)).toBe(114);
	expect(part2(input)).toBe(2);
});
