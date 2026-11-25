import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("keys unlock doors along previously visited corridors", () => {
	expect(part1("#########\n#b.A.@.a#\n#########")).toBe(8);
});
test("the four robots share their keys", () => {
	expect(
		part2("#######\n#a.#Cd#\n##...##\n##.@.##\n##...##\n#cB#Ab#\n#######"),
	).toBe(8);
});
