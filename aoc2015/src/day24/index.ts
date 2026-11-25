import { run } from "../../../scripts/aoc.ts";

function balance(input: string, groups: number): bigint {
	const weights = input
		.trim()
		.split(/\s+/)
		.map(Number)
		.sort((a, b) => b - a);
	const target = weights.reduce((sum, w) => sum + w, 0) / groups;
	const bits = weights.map((_, i) => 1n << BigInt(i));
	const all = (1n << BigInt(weights.length)) - 1n;
	const partitionable = new Map<bigint, boolean>();

	function canPartition(mask: bigint, groupsLeft: number): boolean {
		if (groupsLeft === 1) return true;
		const cached = partitionable.get(mask);
		if (cached !== undefined) return cached;
		const first = bits.findIndex((bit) => (mask & bit) !== 0n);
		function fill(start: number, remaining: number, selected: bigint): boolean {
			if (remaining === 0) return canPartition(mask ^ selected, groupsLeft - 1);
			for (let i = start; i < weights.length; i++) {
				if ((mask & bits[i]) === 0n || weights[i] > remaining) continue;
				if (fill(i + 1, remaining - weights[i], selected | bits[i]))
					return true;
			}
			return false;
		}
		const result = fill(first + 1, target - weights[first], bits[first]);
		partitionable.set(mask, result);
		return result;
	}

	let best: bigint | undefined;
	function firstGroup(
		start: number,
		count: number,
		remaining: number,
		selected: bigint,
		product: bigint,
	) {
		if (best !== undefined && product >= best) return;
		if (count === 0) {
			if (remaining === 0 && canPartition(all ^ selected, groups - 1))
				best = product;
			return;
		}
		if (weights[start] * count < remaining) return;
		for (let i = start; i <= weights.length - count; i++) {
			if (weights[i] <= remaining) {
				firstGroup(
					i + 1,
					count - 1,
					remaining - weights[i],
					selected | bits[i],
					product * BigInt(weights[i]),
				);
			}
		}
	}

	if (Number.isInteger(target)) {
		for (let count = 1; count <= Math.floor(weights.length / groups); count++) {
			firstGroup(0, count, target, 0n, 1n);
			if (best !== undefined) return best;
		}
	}
	throw new Error("Packages cannot be balanced");
}

export function part1(input: string): bigint {
	return balance(input, 3);
}

export function part2(input: string): bigint {
	return balance(input, 4);
}

if (import.meta.main) run(import.meta.url, part1, part2);
