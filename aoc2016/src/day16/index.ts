import { run } from "../../../scripts/aoc.ts";

export function checksum(input: string, size: number) {
	const seed = input.trim();
	const bits = new Uint8Array(size);
	let length = Math.min(size, seed.length);
	for (let i = 0; i < length; i++) bits[i] = Number(seed[i]);
	while (length < size) {
		const end = Math.min(length * 2 + 1, size);
		for (let i = length + 1; i < end; i++) bits[i] = 1 - bits[2 * length - i];
		length = end;
	}
	while (length % 2 === 0 && length > 0) {
		length /= 2;
		for (let i = 0; i < length; i++)
			bits[i] = Number(bits[2 * i] === bits[2 * i + 1]);
	}
	return bits.subarray(0, length).join("");
}

export function part1(input: string) {
	return checksum(input, 272);
}

export function part2(input: string) {
	return checksum(input, 35_651_584);
}

if (import.meta.main) run(import.meta.url, part1, part2);
