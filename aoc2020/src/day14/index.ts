import { run } from "../../../scripts/aoc.ts";

interface Write {
	mask: string;
	address: bigint;
	value: bigint;
}

function* writes(input: string): Generator<Write> {
	let mask = "";
	for (const line of input.trim().split(/\r?\n/)) {
		if (line.startsWith("mask = ")) {
			mask = line.slice(7);
			continue;
		}
		const [, address, value] = /^mem\[(\d+)\] = (\d+)$/.exec(line)!;
		yield { mask, address: BigInt(address), value: BigInt(value) };
	}
}

function bits(mask: string): bigint {
	return BigInt("0b" + mask);
}

export function part1(input: string): bigint {
	const memory = new Map<bigint, bigint>();
	for (const { mask, address, value } of writes(input)) {
		const forced = bits(mask.replaceAll("X", "0"));
		const allowed = bits(mask.replaceAll("X", "1"));
		memory.set(address, (value & allowed) | forced);
	}
	return [...memory.values()].reduce((sum, value) => sum + value, 0n);
}

interface Region {
	fixed: bigint;
	address: bigint;
}

function* exclude(region: Region, covered: Region): Generator<Region> {
	if (
		((region.address ^ covered.address) & region.fixed & covered.fixed) !==
		0n
	) {
		yield region;
		return;
	}
	let { fixed, address } = region;
	let split = covered.fixed & ~fixed;
	while (split) {
		const bit = split & -split;
		split ^= bit;
		fixed |= bit;
		const matching = covered.address & bit;
		yield { fixed, address: address | (bit ^ matching) };
		address |= matching;
	}
}

export function part2(input: string): bigint {
	const covered: Region[] = [];
	let sum = 0n;
	for (const { mask, address, value } of [...writes(input)].reverse()) {
		const fixed = bits(mask.replace(/[01]/g, "1").replaceAll("X", "0"));
		const forced = bits(mask.replaceAll("X", "0"));
		const region = { fixed, address: (address | forced) & fixed };
		let visible = [region];
		for (const later of covered) {
			visible = visible.flatMap((piece) => [...exclude(piece, later)]);
			if (!visible.length) break;
		}
		for (const piece of visible) {
			const fixedBits = piece.fixed.toString(2).replaceAll("0", "").length;
			sum += value << BigInt(mask.length - fixedBits);
		}
		if (visible.length) covered.push(region);
	}
	return sum;
}

if (import.meta.main) run(import.meta.url, part1, part2);
