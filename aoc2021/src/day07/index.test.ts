import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("align the crab fleet", () => {
	const crabs = "16,1,2,0,4,2,7,1,2,14";
	expect(part1(crabs)).toBe(37);
	expect(part2(crabs)).toBe(168);
});
