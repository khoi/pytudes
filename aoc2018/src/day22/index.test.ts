import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("risk and minimum travel time for the example cave", () => {
	const input = "depth: 510\ntarget: 10,10";
	expect(part1(input)).toBe(114);
	expect(part2(input)).toBe(45);
	expect(part2("depth: 510\ntarget: 0,0")).toBe(0);
});
