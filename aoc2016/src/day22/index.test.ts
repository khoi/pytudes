import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `/dev/grid/node-x0-y0   10T    8T
/dev/grid/node-x0-y1   11T    6T
/dev/grid/node-x0-y2   32T   28T
/dev/grid/node-x1-y0    9T    7T
/dev/grid/node-x1-y1    8T    0T
/dev/grid/node-x1-y2   11T    7T
/dev/grid/node-x2-y0   10T    6T
/dev/grid/node-x2-y1    9T    8T
/dev/grid/node-x2-y2    9T    6T`;

test("viable pairs and shortest path around an immovable node", () => {
	expect(part1(sample)).toBe(7);
	expect(part2(sample)).toBe(7);
});

test("payloads can merge into a nonempty destination", () => {
	const grid = "/dev/grid/node-x0-y0 10T 3T\n/dev/grid/node-x1-y0 10T 2T";
	expect(part1(grid)).toBe(2);
	expect(part2(grid)).toBe(1);
});
