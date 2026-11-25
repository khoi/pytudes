import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("memory game at both turn limits", () => {
	expect(part1("0,3,6")).toBe(436);
	expect(part1("1,3,2")).toBe(1);
	expect(part2("0,3,6")).toBe(175594);
});
