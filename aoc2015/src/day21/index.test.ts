import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the player attacks first each round", () => {
	expect(part1("Hit Points: 100\nDamage: 4\nArmor: 0")).toBe(8);
	const boss = "Hit Points: 101\nDamage: 4\nArmor: 0";
	expect(part1(boss)).toBe(10);
	expect(part2(boss)).toBe(8);
});
test("the most expensive loadout includes two distinct rings", () => {
	expect(part2("Hit Points: 1000\nDamage: 200\nArmor: 100")).toBe(356);
});
