import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("loop distance and interior", () => {
	const input = `.....
.S-7.
.|.|.
.L-J.
.....`;
	expect(part1(input)).toBe(4);
	expect(part2(input)).toBe(1);
});

test("nested pipe corners", () => {
	const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;
	expect(part2(input)).toBe(4);
});
