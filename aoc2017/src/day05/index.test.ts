import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("both update rules escape the sample maze", () => {
	const maze = "0\n3\n0\n1\n-3\n";
	expect(part1(maze)).toBe(5);
	expect(part2(maze)).toBe(10);
	expect(part1("-1")).toBe(1);
});
