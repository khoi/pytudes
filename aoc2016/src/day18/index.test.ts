import { expect, test } from "bun:test";
import { safeTiles } from "./index.ts";

test("safe tiles include those on the initial row", () => {
	expect(safeTiles("..^^.", 3)).toBe(6);
	expect(safeTiles(".^^.^.^^^^", 10)).toBe(38);
});
