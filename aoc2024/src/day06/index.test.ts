import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

test("detects loops from new obstructions", () => {
	expect(part1(sample)).toBe(41);
	expect(part2(sample)).toBe(6);
});

test("detects a guard rotating in place", () => {
	expect(part1("###\n#^#\n###")).toBe(1);
});
