import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("adjacent symbols and gears", () => {
	const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
	expect(part1(input)).toBe(4361);
	expect(part2(input)).toBe(467835);
});
