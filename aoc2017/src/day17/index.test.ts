import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("spinlock wraps at the end of the circular buffer", () => {
	expect(part1("3")).toBe(638);
	expect(part1("0")).toBe(0);
	expect(part2("0")).toBe(1);
});
