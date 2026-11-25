import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the shortest safe trip with interchangeable element names", () => {
	const sample = `The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`;
	expect(part1(sample)).toBe(11);
	const bare = "The first floor contains nothing relevant.";
	expect(part2(bare)).toBe(15);
});
