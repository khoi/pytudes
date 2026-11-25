import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `029A
980A
179A
456A
379A`;

test("finds the fewest presses across nested keypads", () => {
	expect(part1(sample)).toBe(126384);
	expect(part2(sample)).toBe(154115708116294);
});
