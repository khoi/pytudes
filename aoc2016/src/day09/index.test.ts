import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("measures nested markers without expanding their text", () => {
	expect(part1("A(1x5)BC")).toBe(7);
	expect(part1("X(8x2)(3x3)ABCY")).toBe(18);
	expect(part2("X(8x2)(3x3)ABCY")).toBe(20);
	expect(part2("(27x12)(20x12)(13x14)(7x10)(1x12)A")).toBe(241920);
	expect(
		part2("(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN"),
	).toBe(445);
});
