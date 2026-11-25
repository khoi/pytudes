import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const input = `x=495, y=2..7
y=7, x=495..501
x=501, y=3..7
x=498, y=2..4
x=506, y=1..2
x=498, y=10..13
x=504, y=10..13
y=13, x=498..504`;

test("water spreads, drains, and settles in the lower basin", () => {
	expect(part1(input)).toBe(57);
	expect(part2(input)).toBe(29);
});
