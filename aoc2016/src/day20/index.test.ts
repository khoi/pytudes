import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("merge overlapping ranges and count all gaps", () => {
	const input = "5-8\n0-2\n4-7";
	expect(part1(input)).toBe(3);
	expect(part2(input, 9)).toBe(2);
	expect(part2("1-3\n2-2\n9-15", 5)).toBe(3);
	expect(part2("")).toBe(2 ** 32);
});
