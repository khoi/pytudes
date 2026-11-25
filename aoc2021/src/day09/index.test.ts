import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("smoke basins", () => {
	const map = "2199943210\n3987894921\n9856789892\n8767896789\n9899965678";
	expect(part1(map)).toBe(15);
	expect(part2(map)).toBe(1134);
});
