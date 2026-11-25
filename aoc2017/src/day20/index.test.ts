import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

function particle(x: number, vx: number, ax = 0): string {
	return `p=<${x},0,0>, v=<${vx},0,0>, a=<${ax},0,0>`;
}

test("eventual distance accounts for velocity opposing acceleration", () => {
	expect(part1([particle(3, 2, -1), particle(4, 0, -2)].join("\n"))).toBe(0);
	expect(part1([particle(0, 1, 1), particle(10, -3, 1)].join("\n"))).toBe(1);
});

test("remove all simultaneous collisions before later collisions", () => {
	expect(
		part2(
			[particle(-6, 3), particle(-4, 2), particle(-2, 1), particle(3, -1)].join(
				"\n",
			),
		),
	).toBe(1);
});

test("solve late collisions, including quadratic paths", () => {
	expect(part2([particle(0, 1), particle(80000, -1)].join("\n"))).toBe(0);
	expect(part2([particle(0, 0, 1), particle(15, 0)].join("\n"))).toBe(0);
	expect(part2([particle(0, 0, 1), particle(16, 0)].join("\n"))).toBe(2);
});
