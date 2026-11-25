import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("the changed rules match balanced nested suffixes", () => {
	const input =
		'0: 8 11\n8: 42\n11: 42 31\n42: "a"\n31: "b"\n\naab\naaabb\naaaab\nab\naabb\naaba';
	expect(part1(input)).toBe(1);
	expect(part2(input)).toBe(3);
});

test("ambiguous prefixes can end in different positions", () => {
	expect(part1('0: 1 2\n1: 3 | 3 3\n2: "b"\n3: "a"\n\nab\naab\naaab')).toBe(2);
});
