import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("fabric area and intact claim", () => {
	const sample = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2";
	expect(part1(sample)).toBe(4);
	expect(part2(sample)).toBe(3);
});
