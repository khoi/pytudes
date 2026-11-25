import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("checks vowels, doubles and forbidden pairs", () => {
	expect(
		part1(
			"ugknbfddgicrmopn\naaa\njchzalrnumimnmhp\nhaegwjzuvuyypxyu\ndvszwmarrgswjxmb",
		),
	).toBe(2);
});

test("repeated pairs must not overlap", () => {
	expect(part2("qjhvhtzxzqqjkmpb\nxxyxx\naaa\naaaa")).toBe(3);
});
