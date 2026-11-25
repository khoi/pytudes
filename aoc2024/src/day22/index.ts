import { run } from "../../../scripts/aoc.ts";

function next(secret: number) {
	secret = (secret ^ (secret << 6)) & 0xffffff;
	secret ^= secret >>> 5;
	return (secret ^ (secret << 11)) & 0xffffff;
}

export function part1(input: string) {
	let sum = 0;
	for (let secret of input.trim().split(/\s+/).map(Number)) {
		for (let i = 0; i < 2000; i++) secret = next(secret);
		sum += secret;
	}
	return sum;
}

export function part2(input: string) {
	const prices = new Int32Array(19 ** 4);
	const seen = new Int32Array(prices.length).fill(-1);
	const seeds = input.trim().split(/\s+/).map(Number);
	let best = 0;
	for (const [buyer, seed] of seeds.entries()) {
		let secret = seed;
		let previous = seed % 10;
		let key = 0;
		for (let i = 0; i < 2000; i++) {
			secret = next(secret);
			const price = secret % 10;
			key = (key * 19 + price - previous + 9) % prices.length;
			previous = price;
			if (i < 3 || seen[key] === buyer) continue;
			seen[key] = buyer;
			prices[key] += price;
			best = Math.max(best, prices[key]);
		}
	}
	return best;
}

if (import.meta.main) run(import.meta.url, part1, part2);
