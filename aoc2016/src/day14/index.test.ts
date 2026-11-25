import { expect, test } from "bun:test";
import { keyIndex, part1 } from "./index.ts";

test("one-time pad indices", () => {
	expect(keyIndex("abc", 1, 1)).toBe(39);
	expect(part1("abc")).toBe(22728);
	expect(keyIndex("abc", 2017, 1)).toBe(10);
}, 30_000);
