import { run } from "../../../scripts/aoc.ts";

type Affine = { scale: bigint; shift: bigint };

const mod = (value: bigint, size: bigint) => ((value % size) + size) % size;

function compose(after: Affine, before: Affine, size: bigint): Affine {
	return {
		scale: mod(after.scale * before.scale, size),
		shift: mod(after.scale * before.shift + after.shift, size),
	};
}

function inverse(value: bigint, size: bigint) {
	let a = value,
		b = size,
		x = 1n,
		y = 0n;
	while (b) {
		const quotient = a / b;
		[a, b] = [b, a % b];
		[x, y] = [y, x - quotient * y];
	}
	if (a !== 1n) throw new Error("Increment must be coprime with deck size");
	return mod(x, size);
}

export function shuffle(input: string, size: bigint, repeats: bigint) {
	let step: Affine = { scale: 1n, shift: 0n };
	for (const line of input.trim().split(/\r?\n/)) {
		let operation: Affine;
		if (line === "deal into new stack") operation = { scale: -1n, shift: -1n };
		else if (line.startsWith("cut "))
			operation = { scale: 1n, shift: -BigInt(line.slice(4)) };
		else if (line.startsWith("deal with increment "))
			operation = { scale: BigInt(line.slice(20)), shift: 0n };
		else throw new Error("Unknown shuffle: " + line);
		step = compose(operation, step, size);
	}
	let result: Affine = { scale: 1n, shift: 0n };
	while (repeats > 0n) {
		if (repeats % 2n) result = compose(step, result, size);
		step = compose(step, step, size);
		repeats /= 2n;
	}
	return {
		positionOf: (card: bigint) => mod(result.scale * card + result.shift, size),
		cardAt: (position: bigint) =>
			mod((position - result.shift) * inverse(result.scale, size), size),
	};
}

export function part1(input: string) {
	return Number(shuffle(input, 10007n, 1n).positionOf(2019n));
}
export function part2(input: string) {
	return Number(
		shuffle(input, 119315717514047n, 101741582076661n).cardAt(2020n),
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
