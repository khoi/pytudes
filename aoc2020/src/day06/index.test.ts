import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("counts questions answered by anyone and everyone", () => {
	const answers = "abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb";
	expect(part1(answers)).toBe(11);
	expect(part2(answers)).toBe(6);
});
