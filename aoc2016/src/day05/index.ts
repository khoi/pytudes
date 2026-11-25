import { run } from "../../../scripts/aoc.ts";

function* matches(door: string) {
	for (let i = 0; ; i++) {
		const hash = Bun.CryptoHasher.hash("md5", door + i, "hex");
		if (hash.startsWith("00000")) yield hash;
	}
}

export function part1(input: string): string {
	let password = "";
	for (const hash of matches(input.trim())) {
		password += hash[5];
		if (password.length === 8) break;
	}
	return password;
}

export function part2(input: string): string {
	const password: string[] = Array(8).fill("");
	let remaining = password.length;
	for (const hash of matches(input.trim())) {
		const position = Number.parseInt(hash[5], 16);
		if (position < password.length && !password[position]) {
			password[position] = hash[6];
			if (--remaining === 0) break;
		}
	}
	return password.join("");
}

if (import.meta.main) run(import.meta.url, part1, part2);
