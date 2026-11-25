import { run } from "../../../scripts/aoc.ts";

export function message(
	input: string,
	repeats: number,
	offset: number,
	phases: number,
) {
	const digits = Array.from(input.trim(), Number);
	const length = digits.length * repeats;
	if (offset < 0 || offset + 8 > length)
		throw new Error("Message offset is out of bounds");
	let signal = Uint8Array.from(
		{ length: length - offset },
		(_, i) => digits[(i + offset) % digits.length],
	);
	const suffixStart = Math.max(0, Math.floor(length / 2) - offset);
	for (let phase = 0; phase < phases; phase++) {
		const next = new Uint8Array(signal.length);
		if (suffixStart > 0) {
			const sums = new Float64Array(signal.length + 1);
			for (let i = 0; i < signal.length; i++) sums[i + 1] = sums[i] + signal[i];
			for (let i = 0; i < suffixStart; i++) {
				const width = offset + i + 1;
				let sum = 0;
				for (let start = i; start < signal.length; start += 4 * width) {
					sum += sums[Math.min(signal.length, start + width)] - sums[start];
					const negative = start + 2 * width;
					if (negative < signal.length)
						sum -=
							sums[Math.min(signal.length, negative + width)] - sums[negative];
				}
				next[i] = Math.abs(sum) % 10;
			}
		}
		let suffix = 0;
		for (let i = signal.length - 1; i >= suffixStart; i--) {
			suffix = (suffix + signal[i]) % 10;
			next[i] = suffix;
		}
		signal = next;
	}
	return signal.subarray(0, 8).join("");
}

export function part1(input: string) {
	return message(input, 1, 0, 100);
}
export function part2(input: string) {
	return message(input, 10_000, Number(input.trim().slice(0, 7)), 100);
}

if (import.meta.main) run(import.meta.url, part1, part2);
