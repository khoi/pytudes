import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

test("counts quadrant populations after wrapping", () => {
	expect(part1(sample, 11, 7)).toBe(12);
});

test("finds the time when the robots form a connected picture", () => {
	expect(part2("p=0,1 v=1,0\np=2,0 v=0,1\np=4,1 v=-1,0", 7, 5)).toBe(1);
});
