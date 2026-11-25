import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("launch toward a target on either side of the origin", () => {
	for (const x of ["20..30", "-30..-20"]) {
		const target = `target area: x=${x}, y=-10..-5`;
		expect(part1(target)).toBe(45);
		expect(part2(target)).toBe(112);
	}
});
test("only a stopped horizontal trajectory permits arbitrarily late hits", () => {
	expect(part2("x=3..3, y=0..0")).toBe(Infinity);
	expect(part2("x=2..2, y=0..0")).toBe(1);
});
