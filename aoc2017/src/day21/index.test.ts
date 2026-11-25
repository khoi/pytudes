import { expect, test } from "bun:test";
import { pixelsAfter, part1, part2 } from "./index.ts";

test("enhance rotated and reflected blocks", () => {
	expect(
		pixelsAfter("../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#", 2),
	).toBe(12);
});

test("track repeating tiles over the complete expansion", () => {
	const rules =
		".#./..#/### => ####/####/####/####\n##/## => ###/###/###\n###/###/### => ####/####/####/####";
	expect(part1(rules)).toBe(18 ** 2);
	expect(part2(rules)).toBe(2187 ** 2);
});
