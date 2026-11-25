import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("turns at intersections and checks every crossed block", () => {
	expect(part1("R2, L3")).toBe(5);
	expect(part1("R2, R2, R2")).toBe(2);
	expect(part2("R8, R4, R4, R8")).toBe(4);
	expect(part2("R1, R1, R1, R1")).toBe(0);
});
