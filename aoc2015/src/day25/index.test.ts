import { expect, test } from "bun:test";
import { part1 } from "./index.ts";

test("indexes the diagonal grid from one", () => {
	expect(part1("row 1, column 1.")).toBe(20151125);
	expect(part1("row 2, column 1.")).toBe(31916031);
	expect(part1("row 1, column 2.")).toBe(18749137);
	expect(part1("row 6, column 6.")).toBe(27995004);
});
