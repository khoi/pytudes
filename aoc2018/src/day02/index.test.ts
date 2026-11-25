import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("box checksum and letters shared by the closest pair", () => {
	expect(part1("abcdef bababc abbcde abcccd aabcdd abcdee ababab")).toBe(12);
	expect(part2("abcde fghij klmno pqrst fguij axcye wvxyz")).toBe("fgij");
});
