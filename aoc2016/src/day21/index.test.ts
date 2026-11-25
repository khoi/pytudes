import { expect, test } from "bun:test";
import { originals, part1, part2 } from "./index.ts";

const example = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`;

test("scrambling and reversing the example", () => {
	expect(part1(example, "abcde")).toBe("decab");
	expect(originals(example, "decab").has("abcde")).toBe(true);
	expect(part2(example, part1(example))).toBe("abcdefgh");
});
