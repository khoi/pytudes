import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample =
	"Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8\nCinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3";
test("balances ingredient properties with and without the calorie limit", () => {
	expect(part1(sample)).toBe(62842880);
	expect(part2(sample)).toBe(57600000);
});
