import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

test("counts cheats by duration and required time savings", () => {
	expect(part1(sample, 20)).toBe(5);
	expect(part2(sample, 50)).toBe(285);
});
