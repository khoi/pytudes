import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("matches patterns on the correct side of brackets", () => {
	expect(
		part1(
			"abba[mnop]qrst\nabcd[bddb]xyyx\naaaa[qwer]tyui\nioxxoj[asdfgh]zxcvbn",
		),
	).toBe(2);
	expect(part2("aba[bab]xyz\nxyx[xyx]xyx\naaa[kek]eke\nzazbz[bzb]cdb")).toBe(3);
});
