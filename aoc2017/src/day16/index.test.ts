import { expect, test } from "bun:test";
import { dance, part1, part2 } from "./index.ts";

test("dance permutations repeat", () => {
	const moves = "s1,x3/4,pe/b";
	expect(dance(moves, 5, 1)).toBe("baedc");
	expect(dance(moves, 5, 2)).toBe("ceadb");
	expect(dance(moves, 5, 1_000_000_000)).toBe("abcde");
	expect(part1("s1")).toBe("pabcdefghijklmno");
	expect(part2("s1")).toBe("abcdefghijklmnop");
});
