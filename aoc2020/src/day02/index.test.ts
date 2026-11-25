import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("validates the count and position policies", () => {
	const policies = "1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc";
	expect(part1(policies)).toBe(2);
	expect(part2(policies)).toBe(1);
});
