import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("lanternfish life cycle", () => {
	expect(part1("3,4,3,1,2")).toBe(5934);
	expect(part2("3,4,3,1,2")).toBe(26984457539);
});
