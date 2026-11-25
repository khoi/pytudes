import { expect, test } from "bun:test";
import { part1 } from "./index.ts";

test("both devices derive the same encryption key", () => {
	expect(part1("5764801\n17807724")).toBe(14897079);
	expect(part1("17807724\n5764801")).toBe(14897079);
});
