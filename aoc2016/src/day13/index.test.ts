import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the example office maze", () => {
	expect(part1("10", 7, 4)).toBe(11);
	expect(part2("10", 0)).toBe(1);
	expect(part2("10", 2)).toBe(5);
});
