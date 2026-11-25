import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the least expensive winning spell sequence", () => {
	expect(part1("Hit Points: 13\nDamage: 8", 10, 250)).toBe(226);
	expect(part1("Hit Points: 14\nDamage: 8", 10, 250)).toBe(641);
});
test("hard mode deals damage before the player can act", () => {
	expect(part1("Hit Points: 4\nDamage: 3", 1, 53)).toBe(53);
	expect(() => part2("Hit Points: 4\nDamage: 3", 1, 53)).toThrow();
	expect(part2("Hit Points: 4\nDamage: 3", 2, 53)).toBe(53);
});
