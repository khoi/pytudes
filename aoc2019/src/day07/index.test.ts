import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("amplifiers maximize thrust across phase permutations", () => {
	expect(part1("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0")).toBe(43210);
	expect(
		part2(
			"3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
		),
	).toBe(139629729);
});
