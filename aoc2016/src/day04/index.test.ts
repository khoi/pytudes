import { expect, test } from "bun:test";
import { decrypt, part1, part2 } from "./index.ts";

test("validates checksums and decrypts genuine room names", () => {
	expect(
		part1(
			"aaaaa-bbb-z-y-x-123[abxyz]\na-b-c-d-e-f-g-h-987[abcde]\nnot-a-real-room-404[oarel]\ntotally-real-room-200[decoy]",
		),
	).toBe(1514);
	expect(decrypt("qzmt-zixmtkozy-ivhz", 343)).toBe("very encrypted name");
	expect(part2("northpole-object-storage-26[oetra]")).toBe(26);
});
