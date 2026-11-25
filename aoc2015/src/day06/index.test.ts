import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("switches inclusive rectangles under both lighting rules", () => {
	const instructions =
		"turn off 1,1 through 1,1\nturn on 0,0 through 0,0\ntoggle 0,0 through 999,999";
	expect(part1(instructions)).toBe(999999);
	expect(part2(instructions)).toBe(2000001);
});
