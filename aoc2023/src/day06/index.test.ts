import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("winning charge times", () => {
	const input = `Time:      7  15   30
Distance:  9  40  200`;
	expect(part1(input)).toBe(288n);
	expect(part2(input)).toBe(71503n);
});

test("ties lose", () => {
	const input = `Time: 10
Distance: 25`;
	expect(part1(input)).toBe(0n);
	expect(part2(input)).toBe(0n);
});
