import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

test("counts words and crossed diagonals", () => {
	expect(part1(sample)).toBe(18);
	expect(part2(sample)).toBe(9);
});
