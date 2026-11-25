import { expect, test } from "bun:test";
import { infections, part1, part2 } from "./index.ts";

test("infection bursts on the infinite grid", () => {
	const sample = "..#\n#..\n...";
	expect(infections(sample, 7, false)).toBe(5);
	expect(part1(sample)).toBe(5587);
	expect(infections(sample, 100, true)).toBe(26);
	expect(part2(sample)).toBe(2511944);
}, 30000);
