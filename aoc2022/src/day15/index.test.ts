import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = [
	[2, 18, -2, 15],
	[9, 16, 10, 16],
	[13, 2, 15, 3],
	[12, 14, 10, 16],
	[10, 20, 10, 16],
	[14, 17, 10, 16],
	[8, 7, 2, 10],
	[2, 0, 2, 10],
	[0, 11, 2, 10],
	[20, 14, 25, 17],
	[17, 20, 21, 22],
	[16, 7, 15, 3],
	[14, 3, 15, 3],
	[20, 1, 15, 3],
]
	.map(
		([x, y, bx, by]) =>
			"Sensor at x=" +
			x +
			", y=" +
			y +
			": closest beacon is at x=" +
			bx +
			", y=" +
			by,
	)
	.join("\n");
test("coverage excludes known beacons", () =>
	expect(part1(sample, 10)).toBe(26));
test("unique uncovered beacon", () => expect(part2(sample, 20)).toBe(56000011));
