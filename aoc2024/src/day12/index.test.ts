import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `AAAA
BBCD
BBCC
EEEC`;

test("prices fences by perimeter and by straight sides", () => {
	expect(part1(sample)).toBe(140);
	expect(part2(sample)).toBe(80);
});

test("counts both inner and outer corners", () => {
	expect(part2("OOOOO\nOXOXO\nOOOOO\nOXOXO\nOOOOO")).toBe(436);
});
