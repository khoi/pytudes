import { run } from "../../../scripts/aoc.ts";

export function keyIndex(input: string, rounds: number, count: number) {
	const salt = input.trim();
	const window = 1001;
	const triples = new Int8Array(window).fill(-1);
	const lastQuint = new Float64Array(16).fill(-1);
	for (let index = 0; ; index++) {
		let hash = salt + index;
		for (let round = 0; round < rounds; round++)
			hash = Bun.MD5.hash(hash, "hex");
		let streak = 1;
		let triple = -1;
		for (let i = 1; i < hash.length; i++) {
			streak = hash[i - 1] === hash[i] ? streak + 1 : 1;
			if (streak === 3 && triple === -1) triple = Number.parseInt(hash[i], 16);
			if (streak === 5) lastQuint[Number.parseInt(hash[i], 16)] = index;
		}
		triples[index % window] = triple;
		const candidate = index - 1000;
		if (candidate < 0) continue;
		const digit = triples[candidate % window];
		if (digit >= 0 && lastQuint[digit] > candidate && --count === 0)
			return candidate;
	}
}

export function part1(input: string) {
	return keyIndex(input, 1, 64);
}

export function part2(input: string) {
	return keyIndex(input, 2017, 64);
}

if (import.meta.main) run(import.meta.url, part1, part2);
