import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test("recognizes safe reports with a single level removed", () => {
	expect(part1(sample)).toBe(2);
	expect(part2(sample)).toBe(4);
});

test("can remove the first or last level", () => {
	expect(part2("1 9 7 6\n9 7 6 8")).toBe(2);
});
