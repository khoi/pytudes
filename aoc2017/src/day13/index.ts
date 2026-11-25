import { run } from "../../../scripts/aoc.ts";

function firewall(input: string) {
	return input
		.trim()
		.split(/\r?\n/)
		.filter(Boolean)
		.map((line) => {
			const [depth, range] = line.split(": ").map(Number);
			return { depth, range, period: Math.max(1, 2 * (range - 1)) };
		});
}

export function part1(input: string): number {
	return firewall(input).reduce(
		(cost, { depth, range, period }) =>
			cost + (depth % period === 0 ? depth * range : 0),
		0,
	);
}

function gcd(a: number, b: number): number {
	while (b) [a, b] = [b, a % b];
	return a;
}

export function part2(input: string): number {
	const layers = firewall(input);
	const cycle = layers.reduce((length, { period }) => {
		if (length === Infinity) return length;
		const next = (length / gcd(length, period)) * period;
		return Number.isSafeInteger(next) ? next : Infinity;
	}, 1);
	const blockSize = 65536;
	for (let start = 0; start < cycle; start += blockSize) {
		const caught = new Uint8Array(Math.min(blockSize, cycle - start));
		for (const { depth, period } of layers) {
			const first = (period - ((start + depth) % period)) % period;
			for (let i = first; i < caught.length; i += period) caught[i] = 1;
		}
		const safe = caught.indexOf(0);
		if (safe !== -1) return start + safe;
	}
	throw new Error("No safe delay");
}

if (import.meta.main) run(import.meta.url, part1, part2);
