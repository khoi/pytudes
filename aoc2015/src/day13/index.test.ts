import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts both people's happiness for each circular adjacency", () => {
	const guests = [
		"A would gain 4 happiness units by sitting next to B.",
		"B would gain 2 happiness units by sitting next to A.",
		"A would lose 9 happiness units by sitting next to C.",
		"C would gain 1 happiness units by sitting next to A.",
		"B would gain 2 happiness units by sitting next to C.",
		"C would gain 3 happiness units by sitting next to B.",
	].join("\n");
	expect(part1(guests)).toBe(3);
	expect(part2(guests)).toBe(11);
});
