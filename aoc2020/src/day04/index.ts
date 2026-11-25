import { run } from "../../../scripts/aoc.ts";

function year(value: string, min: number, max: number) {
	return /^\d{4}$/.test(value) && Number(value) >= min && Number(value) <= max;
}

const fields: Record<string, (value: string) => boolean> = {
	byr: (value) => year(value, 1920, 2002),
	iyr: (value) => year(value, 2010, 2020),
	eyr: (value) => year(value, 2020, 2030),
	hgt: (value) => {
		const match = /^(\d+)(in|cm)$/.exec(value);
		if (!match) return false;
		const height = Number(match[1]);
		return match[2] === "in"
			? height >= 59 && height <= 76
			: height >= 150 && height <= 193;
	},
	hcl: (value) => /^#[0-9a-f]{6}$/.test(value),
	ecl: (value) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
	pid: (value) => /^\d{9}$/.test(value),
};

function passports(input: string): Map<string, string>[] {
	return input
		.trim()
		.split(/\r?\n\s*\n/)
		.map(
			(block) =>
				new Map(
					block.split(/\s+/).map((field) => {
						const [key, value] = field.split(":");
						return [key, value];
					}),
				),
		);
}

export function part1(input: string) {
	return passports(input).filter((passport) =>
		Object.keys(fields).every((key) => passport.has(key)),
	).length;
}

export function part2(input: string) {
	return passports(input).filter((passport) =>
		Object.entries(fields).every(([key, valid]) => {
			const value = passport.get(key);
			return value !== undefined && valid(value);
		}),
	).length;
}

if (import.meta.main) run(import.meta.url, part1, part2);
