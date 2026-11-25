import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("safe ingredients and canonical dangerous list", () => {
	const input =
		"mxmxvkd kfcds sqjhc nhms (contains dairy, fish)\ntrh fvjkl sbzzf mxmxvkd (contains dairy)\nsqjhc fvjkl (contains soy)\nsqjhc mxmxvkd sbzzf (contains fish)";
	expect(part1(input)).toBe(5);
	expect(part2(input)).toBe("mxmxvkd,sqjhc,fvjkl");
});
