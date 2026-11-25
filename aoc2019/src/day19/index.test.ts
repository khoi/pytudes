import { expect, test } from "bun:test";
import { part1, square } from "./index.ts";

test("scanner reads the drone result for each point", () => {
	expect(part1("3,30,3,31,7,30,31,32,4,32,99")).toBe(1225);
});
test("a square must fit between the opposite corners of a slanted beam", () => {
	expect(square((x, y) => x >= y && x <= 2 * y, 3)).toBe(60004);
});
