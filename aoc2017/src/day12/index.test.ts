import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("isolated nodes form their own group", () => {
	const input =
		"0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5";
	expect(part1(input)).toBe(6);
	expect(part2(input)).toBe(2);
});
