import { run } from "../../../scripts/aoc.ts";

function winningHolds(time: bigint, record: bigint) {
	let low = 0n;
	let high = time / 2n;
	if (high * (time - high) <= record) return 0n;
	while (low < high) {
		const hold = (low + high) / 2n;
		if (hold * (time - hold) > record) high = hold;
		else low = hold + 1n;
	}
	return time - 2n * low + 1n;
}

function races(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => line.match(/\d+/g)!);
}

export function part1(input: string) {
	const [times, records] = races(input);
	return times.reduce(
		(product, t, i) => product * winningHolds(BigInt(t), BigInt(records[i])),
		1n,
	);
}

export function part2(input: string) {
	const [times, records] = races(input);
	return winningHolds(BigInt(times.join("")), BigInt(records.join("")));
}

if (import.meta.main) run(import.meta.url, part1, part2);
