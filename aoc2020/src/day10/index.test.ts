import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts joltage differences and valid chains", () => {
	const adapters = "16 10 15 5 1 11 7 19 6 12 4";
	expect(part1(adapters)).toBe(35);
	expect(part2(adapters)).toBe(8n);
	const larger =
		"28 33 18 42 31 14 46 20 48 47 24 23 49 45 19 38 39 11 1 32 25 35 8 17 7 9 4 2 34 10 3";
	expect(part1(larger)).toBe(220);
	expect(part2(larger)).toBe(19208n);
});
