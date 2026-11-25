import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("awards every leader a point after each second", () => {
	const race =
		"Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.\nDancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.";
	expect(part1(race, 1000)).toBe(1120);
	expect(part2(race, 1000)).toBe(689);
});
