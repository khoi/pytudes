import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("black tiles initially and after one hundred days", async () => {
	const sample = await Bun.file(
		new URL("./sample.txt", import.meta.url),
	).text();
	expect(part1(sample)).toBe(10);
	expect(part2(sample)).toBe(2208);
});
