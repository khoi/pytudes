import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "Generator A starts with 65\nGenerator B starts with 8921";

test("judge counts matches with and without filtering", () => {
	expect(part1(sample)).toBe(588);
	expect(part2(sample)).toBe(309);
}, 30000);
