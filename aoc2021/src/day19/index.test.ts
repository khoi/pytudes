import { test, expect } from "bun:test";
import { part1, part2 } from "./index.ts";

test("locates a rotated and translated scanner with one new beacon", () => {
	const beacons = Array.from({ length: 12 }, (_, i) => [
		i ** 2,
		i * 3,
		i ** 3 - 2,
	]);
	const local = [...beacons, [800, -700, 99]].map(([x, y, z]) => [
		y + 2,
		5 - x,
		z - 10,
	]);
	const block = (i: number, ps: number[][]) =>
		[`--- scanner ${i} ---`, ...ps.map((p) => p.join(","))].join("\n");
	const input = [block(0, beacons), block(1, local)].join("\n\n");
	expect(part1(input)).toBe(13);
	expect(part2(input)).toBe(17);
});
