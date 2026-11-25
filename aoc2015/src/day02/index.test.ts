import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("wraps each box and ties its shortest perimeter", () => {
	const boxes = "2x3x4\n1x1x10";
	expect(part1(boxes)).toBe(58 + 43);
	expect(part2(boxes)).toBe(34 + 14);
});
