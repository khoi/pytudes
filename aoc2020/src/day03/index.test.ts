import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("wraps each slope across the repeating map", () => {
	const forest = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
	expect(part1(forest)).toBe(7);
	expect(part2(forest)).toBe(336);
});
