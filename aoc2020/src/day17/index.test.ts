import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("six cycles in three and four dimensions", () => {
	const plane = ".#.\n..#\n###";
	expect(part1(plane)).toBe(112);
	expect(part2(plane)).toBe(848);
});
