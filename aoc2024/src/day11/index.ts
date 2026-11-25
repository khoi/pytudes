import { run } from "../../../scripts/aoc.ts";

function blink(input: string, times: number): bigint {
	let stones = new Map<bigint, bigint>();
	for (const stone of input.trim().split(/\s+/).map(BigInt)) {
		stones.set(stone, (stones.get(stone) ?? 0n) + 1n);
	}
	for (let i = 0; i < times; i++) {
		const next = new Map<bigint, bigint>();
		function add(stone: bigint, count: bigint) {
			next.set(stone, (next.get(stone) ?? 0n) + count);
		}
		for (const [stone, count] of stones) {
			const digits = stone.toString();
			if (stone === 0n) add(1n, count);
			else if (digits.length % 2 === 0) {
				const half = digits.length / 2;
				add(BigInt(digits.slice(0, half)), count);
				add(BigInt(digits.slice(half)), count);
			} else add(stone * 2024n, count);
		}
		stones = next;
	}
	let count = 0n;
	for (const quantity of stones.values()) count += quantity;
	return count;
}

export function part1(input: string): bigint {
	return blink(input, 25);
}

export function part2(input: string): bigint {
	return blink(input, 75);
}

if (import.meta.main) run(import.meta.url, part1, part2);
