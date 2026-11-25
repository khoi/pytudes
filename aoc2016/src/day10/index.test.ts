import { expect, test } from "bun:test";
import { factory, part1, part2 } from "./index.ts";

test("delivers low and high chips when a bot holds a pair", () => {
	const instructions = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`;
	expect(factory(instructions).comparisons.get("2,5")).toBe(2);
	expect(part2(instructions)).toBe(30);
	expect(
		part1(
			instructions
				.replace("value 5", "value 61")
				.replace("value 2", "value 17"),
		),
	).toBe(2);
});
