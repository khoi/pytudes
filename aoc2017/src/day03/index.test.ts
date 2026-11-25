import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("distance to the center", () => {
	for (const [square, distance] of [
		[1, 0],
		[12, 3],
		[23, 2],
		[1024, 31],
	]) {
		expect(part1(String(square))).toBe(distance);
	}
});

test("first neighbor sum strictly above the input", () => {
	expect(part2("1")).toBe(2);
	expect(part2("747")).toBe(806);
});
