import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = "Sabqponm\nabcryxxl\naccszExk\nacctuvwj\nabdefghi";
test("climb from the trailhead", () => expect(part1(sample)).toBe(31));
test("shortest climb from any low point", () => expect(part2(sample)).toBe(29));
