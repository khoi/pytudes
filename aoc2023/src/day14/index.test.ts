import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("platform loads", () => {
	const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
	expect(part1(input)).toBe(136);
	expect(part2(input)).toBe(64);
});
