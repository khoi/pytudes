import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("mirror seams", () => {
	const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
	expect(part1(input)).toBe(405);
	expect(part2(input)).toBe(400);
});
