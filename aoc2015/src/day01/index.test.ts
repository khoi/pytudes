import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("tracks floors and counts the first basement step from one", () => {
	expect(part1("(())")).toBe(0);
	expect(part1("))(")).toBe(-1);
	expect(part2(")")).toBe(1);
	expect(part2("()())\n")).toBe(5);
});
