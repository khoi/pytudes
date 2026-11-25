import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("measures range from the strongest bot", () => {
	expect(
		part1(`pos=<0,0,0>, r=4
pos=<1,0,0>, r=1
pos=<4,0,0>, r=3
pos=<0,2,0>, r=1
pos=<0,5,0>, r=3
pos=<0,0,3>, r=1
pos=<1,1,1>, r=1
pos=<1,1,2>, r=1
pos=<1,3,1>, r=1`),
	).toBe(7);
});

test("breaks coverage ties by distance to the origin", () => {
	expect(
		part2(`pos=<10,12,12>, r=2
pos=<12,14,12>, r=2
pos=<16,12,12>, r=4
pos=<14,14,14>, r=6
pos=<50,50,50>, r=200
pos=<10,10,10>, r=5`),
	).toBe(36);
	expect(part2("pos=<-5,2,1>, r=1")).toBe(7);
});
