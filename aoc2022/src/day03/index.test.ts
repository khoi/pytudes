import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = [
	"vJrwpWtwJgWrhcsFMMfFFhFp",
	"jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
	"PmmdzqPrVvPwwTWBwg",
	"wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
	"ttgJtRGJQctTZtZT",
	"CrZsJsPPZsGzwwsLwLmpwMDw",
].join("\n");
test("shared items in compartments", () => expect(part1(sample)).toBe(157));
test("badges for groups of three", () => expect(part2(sample)).toBe(70));
