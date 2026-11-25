import { expect, test } from "bun:test";
import { decodeLetters } from "./ocr.ts";

test("decodes letters with different widths and spacing", () => {
	expect(
		decodeLetters([
			" #  #  ###",
			" #  #   # ",
			" ####   # ",
			" #  #   # ",
			" #  #   # ",
			" #  #  ###",
		]),
	).toBe("HI");
});

test("keeps an unfamiliar image readable", () => {
	const rows = ["#####", "#...#", "#...#", "#...#", "#####"];
	expect(decodeLetters(rows)).toBe(rows.join("\n"));
});
