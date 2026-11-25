import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const rules = "e => H\ne => O\nH => HO\nH => OH\nO => HH\n\n";
test("counts distinct one-step products and shortest syntheses", () => {
	expect(part1(rules + "HOH")).toBe(4);
	expect(part1(rules + "HOHOHO")).toBe(7);
	expect(part2(rules + "HOH")).toBe(3);
	expect(part2(rules + "HOHOHO")).toBe(6);
});
test("charges a long production once and chooses the shorter derivation", () => {
	const rules = "e => AlBC\ne => X\nX => AlBC\nB => BB\n\n";
	expect(part2(rules + "AlBBC")).toBe(2);
});
