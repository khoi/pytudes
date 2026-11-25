import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("finds both passwords for the example door", () => {
	expect(part1("abc")).toBe("18f47a30");
	expect(part2("abc")).toBe("05ace8e3");
}, 120_000);
