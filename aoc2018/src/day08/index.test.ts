import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("license metadata and indexed child values", () => {
	const sample = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";
	expect(part1(sample)).toBe(138);
	expect(part2(sample)).toBe(66);
});
