import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("invalid values add up to the scanning error rate", () => {
	expect(
		part1(
			"class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50\n\nyour ticket:\n7,1,14\n\nnearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12",
		),
	).toBe(71);
});

test("uses the assigned columns on the personal ticket", () => {
	expect(
		part2(
			"departure class: 0-1 or 4-19\nrow: 0-5 or 8-19\ndeparture seat: 0-13 or 16-19\n\nyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9",
		),
	).toBe(156);
});
