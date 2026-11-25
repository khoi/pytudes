import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds the next strings satisfying all three rules", () => {
	expect(part1("abcdefgh")).toBe("abcdffaa");
	expect(part1("ghijklmn")).toBe("ghjaabcc");
	expect(part2("abcdefgh")).toBe("abcdffbb");
});
