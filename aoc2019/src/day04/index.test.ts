import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("codes have nondecreasing digits and a qualifying group", () => {
	for (const [code, anyPair, exact] of [
		[111111, 1, 0],
		[223450, 0, 0],
		[123789, 0, 0],
		[112233, 1, 1],
		[123444, 1, 0],
		[111122, 1, 1],
	]) {
		const range = `${code}-${code}`;
		expect(part1(range)).toBe(anyPair);
		expect(part2(range)).toBe(exact);
	}
});
