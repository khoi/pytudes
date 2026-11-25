import { expect, test } from "bun:test";
import { checksum } from "./index.ts";

test("expand, truncate, and checksum a dragon curve", () => {
	expect(checksum("10000", 20)).toBe("01100");
	expect(checksum("110010110100", 12)).toBe("100");
	expect(checksum("10", 1)).toBe("1");
});
