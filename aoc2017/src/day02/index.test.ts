import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("adds each row's range", () => {
	expect(part1("5 1 9 5\n7 5 3\n2 4 6 8")).toBe(18);
});

test("only divides evenly divisible entries", () => {
	expect(part2("5 9 2 8\n9 4 7 3\n3 8 6 5")).toBe(9);
});
