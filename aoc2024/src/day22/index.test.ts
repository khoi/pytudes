import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `1
10
100
2024`;

const buyers = `1
2
3
2024`;

test("evolves the secrets and sells at the first matching price sequence", () => {
	expect(part1(sample)).toBe(37327623);
	expect(part2(buyers)).toBe(23);
});
