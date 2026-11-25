import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("corners and roughness of the assembled image", async () => {
	const input = await Bun.file(new URL("./sample.txt", import.meta.url)).text();
	expect(part1(input)).toBe(20899048083289);
	expect(part2(input)).toBe(273);
});
