import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
test("packet marker", () => expect(part1(sample)).toBe(7));
test("message marker", () => expect(part2(sample)).toBe(19));
