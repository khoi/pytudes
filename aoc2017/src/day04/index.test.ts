import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("rejects repeated words", () => {
	expect(part1("aa bb cc dd ee\naa bb cc dd aa\naa bb cc dd aaa")).toBe(2);
});

test("rejects permuted words too", () => {
	expect(
		part2(
			"abcde fghij\nabcde xyz ecdab\na ab abc abd abf abj\niiii oiii ooii oooi oooo\noiii ioii iioi iiio",
		),
	).toBe(3);
});
