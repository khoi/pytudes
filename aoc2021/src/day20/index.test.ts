import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("a lit neighbor lights the next pixel", () => {
	const input = "." + "#".repeat(511) + "\n\n#";
	expect(part1(input)).toBe(25);
	expect(part2(input)).toBe(10201);
});
test("an infinite lit background may return to darkness", () => {
	const invert = Array.from({ length: 512 }, (_, i) =>
		i & 16 ? "." : "#",
	).join("");
	expect(part1(invert + "\n\n###\n..#")).toBe(4);
});
