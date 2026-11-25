import { expect, test } from "bun:test";
import { screen, part1 } from "./index.ts";

test("rotates rows and columns with wraparound", () => {
	const input =
		"rect 3x2\nrotate column x=1 by 1\nrotate row y=0 by 4\nrotate column x=1 by 1";
	expect(screen(input, 7, 3)).toEqual([".#..#.#", "#.#....", ".#....."]);
	expect(part1(input)).toBe(6);
});
