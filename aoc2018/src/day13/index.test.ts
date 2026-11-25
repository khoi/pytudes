import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("tracks first collision and immediately removes crashed carts", () => {
	const crash = String.raw`/->-\
|   |  /----\
| /-+--+-\  |
| | |  | v  |
\-+-/  \-+--/
  \------/`;
	const survivor = String.raw`/>-<\
|   |
| /<+-\
| | | v
\>+</ |
  |   ^
  \<->/`;
	expect(part1(crash)).toBe("7,3");
	expect(part2(survivor)).toBe("6,4");
});
