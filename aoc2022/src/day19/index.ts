import { run } from "../../../scripts/aoc.ts";

type Blueprint = { id: number; costs: number[][] };

function blueprints(input: string): Blueprint[] {
	return input
		.trim()
		.split(/\r?\n/)
		.map((line) => {
			const [
				id,
				ore,
				clay,
				obsidianOre,
				obsidianClay,
				geodeOre,
				geodeObsidian,
			] = line.match(/\d+/g)!.map(Number);
			return {
				id,
				costs: [
					[ore, 0, 0],
					[clay, 0, 0],
					[obsidianOre, obsidianClay, 0],
					[geodeOre, 0, geodeObsidian],
				],
			};
		});
}

function maxGeodes({ costs }: Blueprint, minutes: number): number {
	const maxSpend = [0, 1, 2].map((material) =>
		Math.max(...costs.map((cost) => cost[material])),
	);
	const seen = new Map<string, number>();
	let best = 0;
	function build(
		time: number,
		stock: number[],
		robots: number[],
		geodes: number,
	) {
		const guaranteed = geodes + time * robots[3];
		best = Math.max(best, guaranteed);
		if (guaranteed + (time * (time - 1)) / 2 <= best) return;
		const capped = stock.map((amount, m) =>
			Math.min(amount, time * maxSpend[m] - robots[m] * (time - 1)),
		);
		const key = [time, ...robots, ...capped].join(",");
		if ((seen.get(key) ?? -1) >= geodes) return;
		seen.set(key, geodes);
		for (let kind = 3; kind >= 0; kind--) {
			if (kind < 3 && robots[kind] >= maxSpend[kind]) continue;
			let wait = 0;
			for (let m = 0; m < 3; m++) {
				const missing = costs[kind][m] - stock[m];
				if (missing > 0) wait = Math.max(wait, Math.ceil(missing / robots[m]));
			}
			const elapsed = wait + 1;
			if (elapsed >= time) continue;
			const next = stock.map(
				(amount, m) => amount + elapsed * robots[m] - costs[kind][m],
			);
			const fleet = robots.slice();
			fleet[kind]++;
			build(time - elapsed, next, fleet, geodes + elapsed * robots[3]);
		}
	}
	build(minutes, [0, 0, 0], [1, 0, 0, 0], 0);
	return best;
}

export function part1(input: string): number {
	return blueprints(input).reduce(
		(sum, plan) => sum + plan.id * maxGeodes(plan, 24),
		0,
	);
}

export function part2(input: string): number {
	return blueprints(input)
		.slice(0, 3)
		.reduce((product, plan) => product * maxGeodes(plan, 32), 1);
}

if (import.meta.main) run(import.meta.url, part1, part2);
