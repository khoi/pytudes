import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts redistributions and the repeating loop", () => {
	expect(part1("0 2 7 0")).toBe(5);
	expect(part2("0 2 7 0")).toBe(4);
	expect(part1("0")).toBe(1);
});
