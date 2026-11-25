import { run } from "../../../scripts/aoc.ts";

export function factory(input: string) {
	const rules = new Map<string, [string, string]>();
	const deliveries: [string, number][] = [];
	for (const line of input.trim().split(/\r?\n/)) {
		const words = line.split(" ");
		if (words[0] === "value")
			deliveries.push([`bot ${words[5]}`, Number(words[1])]);
		else
			rules.set(`bot ${words[1]}`, [
				`${words[5]} ${words[6]}`,
				`${words[10]} ${words[11]}`,
			]);
	}
	const chips = new Map<string, number[]>();
	const comparisons = new Map<string, number>();
	for (let i = 0; i < deliveries.length; i++) {
		const [name, value] = deliveries[i];
		const held = chips.get(name) ?? [];
		held.push(value);
		chips.set(name, held);
		if (name.startsWith("bot") && held.length === 2) {
			const targets = rules.get(name);
			if (!targets) throw new Error(`Missing rule for ${name}`);
			const [low, high] = held.sort((a, b) => a - b);
			const pair = `${low},${high}`;
			if (!comparisons.has(pair)) comparisons.set(pair, Number(name.slice(4)));
			held.length = 0;
			deliveries.push([targets[0], low], [targets[1], high]);
		}
	}
	return { chips, comparisons };
}

export function part1(input: string): number {
	const bot = factory(input).comparisons.get("17,61");
	if (bot === undefined) throw new Error("No bot compared 17 and 61");
	return bot;
}

export function part2(input: string): number {
	const { chips } = factory(input);
	return [0, 1, 2].reduce((product, id) => {
		const value = chips.get(`output ${id}`)?.[0];
		if (value === undefined) throw new Error(`Empty output ${id}`);
		return product * value;
	}, 1);
}

if (import.meta.main) run(import.meta.url, part1, part2);
