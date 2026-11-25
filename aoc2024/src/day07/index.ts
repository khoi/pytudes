import { run } from "../../../scripts/aoc.ts";

function reachable(
	target: bigint,
	values: bigint[],
	concatenate: boolean,
): boolean {
	function match(result: bigint, index: number): boolean {
		if (index === 0) return result === values[0];
		const last = values[index];
		if (last === 0n && result === 0n) return true;
		if (last !== 0n && result % last === 0n && match(result / last, index - 1))
			return true;
		if (concatenate) {
			const scale = 10n ** BigInt(last.toString().length);
			if (result % scale === last && match(result / scale, index - 1))
				return true;
		}
		return result >= last && match(result - last, index - 1);
	}
	return match(target, values.length - 1);
}

function calibration(input: string, concatenate: boolean): bigint {
	let sum = 0n;
	for (const line of input.trim().split(/\r?\n/)) {
		const [target, ...values] = line.match(/\d+/g)!.map(BigInt);
		if (reachable(target, values, concatenate)) sum += target;
	}
	return sum;
}

export function part1(input: string): bigint {
	return calibration(input, false);
}

export function part2(input: string): bigint {
	return calibration(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
