import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds shortest and longest paths with free endpoints", () => {
	const routes =
		"London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141";
	expect(part1(routes)).toBe(605);
	expect(part2(routes)).toBe(982);
});
