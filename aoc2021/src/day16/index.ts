import { run } from "../../../scripts/aoc.ts";

function decode(input: string) {
	const bits = Array.from(input.trim(), (c) =>
		parseInt(c, 16).toString(2).padStart(4, "0"),
	).join("");
	let offset = 0;
	let versions = 0;
	function read(count: number) {
		if (offset + count > bits.length) throw new Error("Incomplete packet");
		const result = parseInt(bits.slice(offset, offset + count), 2);
		offset += count;
		return result;
	}
	function packet(): bigint {
		versions += read(3);
		const type = read(3);
		if (type === 4) {
			let value = 0n;
			let more: number;
			do {
				more = read(1);
				value = value * 16n + BigInt(read(4));
			} while (more);
			return value;
		}
		const values: bigint[] = [];
		if (read(1)) {
			const count = read(11);
			for (let i = 0; i < count; i++) values.push(packet());
		} else {
			const length = read(15);
			const end = offset + length;
			while (offset < end) values.push(packet());
			if (offset !== end) throw new Error("Invalid subpacket length");
		}
		switch (type) {
			case 0:
				return values.reduce((a, b) => a + b, 0n);
			case 1:
				return values.reduce((a, b) => a * b, 1n);
			case 2:
				return values.reduce((a, b) => (a < b ? a : b));
			case 3:
				return values.reduce((a, b) => (a > b ? a : b));
			case 5:
				return BigInt(values[0] > values[1]);
			case 6:
				return BigInt(values[0] < values[1]);
			case 7:
				return BigInt(values[0] === values[1]);
			default:
				throw new Error("Unknown packet type");
		}
	}
	const value = packet();
	return { value, versions };
}

export function part1(input: string) {
	return decode(input).versions;
}
export function part2(input: string) {
	const value = decode(input).value;
	return value <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(value) : value;
}

if (import.meta.main) run(import.meta.url, part1, part2);
