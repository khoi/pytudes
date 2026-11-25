import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("interprets horizontal rows and columns of three rows", () => {
	expect(part1(" 5 10 25\n3 4 5\n2 2 4")).toBe(1);
	expect(
		part2(
			"101 301 501\n102 302 502\n103 303 503\n201 401 601\n202 402 602\n203 403 603",
		),
	).toBe(6);
});
