import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts equal-sized containers individually", () => {
	const input = "20\n15\n10\n5\n5";
	expect(part1(input, 25)).toBe(4);
	expect(part2(input, 25)).toBe(3);
	expect(part2(input, 100)).toBe(0);
});
