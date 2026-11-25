import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("reading-order movement and full rounds determine the combat score", () => {
	const cave = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;
	expect(part1(cave)).toBe(27730);
	expect(part2(cave)).toBe(4988);
	const ties = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;
	expect(part1(ties)).toBe(39514);
	expect(part2(ties)).toBe(31284);
});
