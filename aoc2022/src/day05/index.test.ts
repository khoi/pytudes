import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = [
	"    [D]",
	"[N] [C]",
	"[Z] [M] [P]",
	" 1   2   3",
	"",
	"move 1 from 2 to 1",
	"move 3 from 1 to 3",
	"move 2 from 2 to 1",
	"move 1 from 1 to 2",
].join("\n");
test("move individual crates", () => expect(part1(sample)).toBe("CMZ"));
test("move groups together", () => expect(part2(sample)).toBe("MCD"));
