import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("nearest sites and distance region including points outside the bounding box", () => {
	const sample = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9";
	expect(part1(sample)).toBe(17);
	expect(part2(sample, 32)).toBe(16);
	expect(part2("0, 0", 3)).toBe(13);
});
