import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

const sample = await Bun.file(new URL("./sample.txt", import.meta.url)).text();
test("twenty rounds with relief", () => expect(part1(sample)).toBe(10605));
test("ten thousand rounds without relief", () =>
	expect(part2(sample)).toBe(2713310158));
