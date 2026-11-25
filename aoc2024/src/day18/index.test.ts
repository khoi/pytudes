import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;

test("finds the first byte that closes every route", () => {
	expect(part1(sample, 7, 12)).toBe(22);
	expect(part2(sample, 7)).toBe("6,1");
});
