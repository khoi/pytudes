import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const grid = `...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`;

test("bounded garden and repeating garden", () => {
	expect(part1(grid, 6)).toBe(16);
	expect(part2(grid, 10)).toBe(50);
	expect(part2(grid, 50)).toBe(1594);
	expect(part2(grid, 5000)).toBe(16733044);
	expect(part2("S", 100)).toBe(10201);
	expect(part1("S", 2)).toBe(0);
});

test("rectangular tiling and isolated start", () => {
	expect(part2("S..\n...", 4321)).toBe(4322 ** 2);
	expect(part2("###\n#S#\n###", 5000)).toBe(0);
});
