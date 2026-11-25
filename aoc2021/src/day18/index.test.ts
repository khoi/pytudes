import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("explosions and splits repeat after addition", () => {
	expect(part1("[[[[4,3],4],4],[7,[[8,4],9]]]\n[1,1]")).toBe(1384);
	expect(part1("[1,1]\n[2,2]\n[3,3]\n[4,4]\n[5,5]\n[6,6]")).toBe(1137);
});
test("pair order changes magnitude", () => {
	expect(part2("[1,2]\n[[3,4],5]")).toBe(197);
});
