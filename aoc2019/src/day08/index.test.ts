import { expect, test } from "bun:test";
import { part1, render } from "./index.ts";

test("transparent pixels reveal the first opaque layer", () => {
	expect(part1("123456789012", 3, 2)).toBe(1);
	expect(render("0222112222120000", 2, 2)).toBe(" #\n# ");
});
