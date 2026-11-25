import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const grid = ".#.#.#\n...##.\n#....#\n..#...\n#.#..#\n####..";
test("updates all lights simultaneously", () => {
	expect(part1(grid, 4)).toBe(4);
});
test("pins the corner lights before the first step and after every update", () => {
	expect(part2(grid, 5)).toBe(17);
});
