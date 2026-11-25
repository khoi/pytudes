import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

test("counts every seat on a minimum-score route", () => {
	expect(part1(sample)).toBe(7036);
	expect(part2(sample)).toBe(45);
});
