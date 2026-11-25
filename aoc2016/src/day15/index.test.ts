import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the capsule passes each disc one second apart", () => {
	const input =
		"Disc #1 has 5 positions; at time=0, it is at position 4.\nDisc #2 has 2 positions; at time=0, it is at position 1.";
	expect(part1(input)).toBe(5);
	expect(part2(input)).toBe(85);
});

test("discs with a shared factor may align or conflict", () => {
	const first = "Disc #1 has 4 positions; at time=0, it is at position 1.";
	expect(
		part1(first + "\nDisc #2 has 6 positions; at time=0, it is at position 0."),
	).toBe(10);
	expect(() =>
		part1(first + "\nDisc #2 has 6 positions; at time=0, it is at position 1."),
	).toThrow();
});
