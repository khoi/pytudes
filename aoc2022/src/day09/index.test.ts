import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "R 4\nU 4\nL 3\nD 1\nR 4\nD 1\nL 5\nR 2";
test("short rope", () => expect(part1(sample)).toBe(13));
test("long rope", () => {
	expect(part2(sample)).toBe(1);
	expect(part2("R 5\nU 8\nL 8\nD 3\nR 17\nD 10\nL 25\nU 20")).toBe(36);
});
