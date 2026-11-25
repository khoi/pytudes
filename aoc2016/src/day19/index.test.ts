import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("compare both elimination rules with a circle of elves", () => {
	for (let n = 1; n <= 90; n++) {
		for (const across of [false, true]) {
			const circle = Array.from({ length: n }, (_, i) => i + 1);
			while (circle.length > 1) {
				circle.splice(across ? Math.floor(circle.length / 2) : 1, 1);
				circle.push(circle.shift()!);
			}
			expect((across ? part2 : part1)(String(n))).toBe(circle[0]);
		}
	}
});
