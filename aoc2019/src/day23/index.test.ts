import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const program = "3,30,104,255,104,5,4,30,3,31,1105,1,8";

test("the first NAT packet and the last idle packet differ", () => {
	expect(part1(program)).toBe(0);
	expect(part2(program)).toBe(49);
});
