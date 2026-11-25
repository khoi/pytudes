import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("carries the keypad position across lines", () => {
	const moves = "ULL\nRRDDD\nLURDL\nUUUUD";
	expect(part1(moves)).toBe("1985");
	expect(part2(moves)).toBe("5DB3");
});
