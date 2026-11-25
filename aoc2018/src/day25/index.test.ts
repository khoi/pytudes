import { expect, test } from "bun:test";
import { part1 } from "./index.ts";

test("constellations link stars transitively in four dimensions", () => {
	expect(
		part1(`0,0,0,0
3,0,0,0
0,3,0,0
0,0,3,0
0,0,0,3
0,0,0,6
9,0,0,0
12,0,0,0`),
	).toBe(2);
	expect(
		part1(`-1,2,2,0
0,0,2,-2
0,0,0,-2
-1,2,0,0
-2,-2,-2,2
3,0,2,-1
-1,3,2,2
-1,0,-1,0
0,2,1,-2
3,0,0,0`),
	).toBe(4);
});
