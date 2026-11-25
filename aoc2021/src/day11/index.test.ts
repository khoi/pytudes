import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("octopus flashes", () => {
	const grid = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
	expect(part1(grid)).toBe(1656);
	expect(part2(grid)).toBe(195);
});
