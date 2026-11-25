import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("independent axes return to the joint lunar state", () => {
	const moons =
		"<x=-1, y=0, z=2>\n<x=2, y=-10, z=-7>\n<x=4, y=-8, z=8>\n<x=3, y=5, z=-1>";
	expect(part1(moons, 10)).toBe(179);
	expect(part2(moons)).toBe(2772);
});
