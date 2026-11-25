import { expect, test } from "bun:test";
import { part1, part2 } from "./index.ts";

test("separates missing fields from invalid values", () => {
	const valid =
		"ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\nbyr:1937 iyr:2017 hgt:183cm";
	const missing = valid.replace("ecl:gry ", "");
	const invalid = valid.replace("hgt:183cm", "hgt:183in");
	const passports = [valid, missing, invalid].join("\n\n");
	expect(part1(passports)).toBe(2);
	expect(part2(passports)).toBe(1);
});
