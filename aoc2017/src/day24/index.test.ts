import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("strongest and longest bridges may differ", () => {
	const input = "0/2\n2/2\n2/3\n3/4\n3/5\n0/1\n10/1\n9/10";
	expect(part1(input)).toBe(31);
	expect(part2(input)).toBe(19);
});

test("identical components are independently usable", () => {
	expect(part2("0/1\n0/1\n0/2")).toBe(4);
});
