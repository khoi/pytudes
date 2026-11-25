import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("intermediate surplus is shared between reactions", () => {
	const recipes = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;
	expect(part1(recipes)).toBe(31);
});

test("fuel production batches share unused ingredients", () => {
	expect(part2("3 ORE => 2 A\n3 A => 1 FUEL")).toBe(222222222222);
});
