import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("interprets jumps and initializes c per part", () => {
	expect(part1("cpy 41 a\ninc a\ninc a\ndec a\njnz a 2\ndec a")).toBe(42);
	expect(part2("cpy c a\ninc a")).toBe(2);
});
