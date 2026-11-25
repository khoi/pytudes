import { run } from "../../../scripts/aoc.ts";

function chemical(term: string) {
	const [amount, name] = term.trim().split(" ");
	return { name, amount: Number(amount) };
}

function parse(input: string) {
	return new Map(
		input
			.trim()
			.split("\n")
			.map((line) => {
				const [left, right] = line.split(" => ");
				const output = chemical(right);
				return [
					output.name,
					{ amount: output.amount, ingredients: left.split(",").map(chemical) },
				];
			}),
	);
}

function oreFor(recipes: ReturnType<typeof parse>, fuel: number) {
	const surplus = new Map<string, number>();
	function produce(name: string, amount: number): number {
		if (name === "ORE") return amount;
		const needed = amount - (surplus.get(name) ?? 0);
		const recipe = recipes.get(name)!;
		const batches = Math.max(0, Math.ceil(needed / recipe.amount));
		surplus.set(name, batches * recipe.amount - needed);
		if (batches === 0) return 0;
		return recipe.ingredients.reduce(
			(ore, item) => ore + produce(item.name, item.amount * batches),
			0,
		);
	}
	return produce("FUEL", fuel);
}

export function part1(input: string) {
	return oreFor(parse(input), 1);
}

export function part2(input: string) {
	const recipes = parse(input);
	const budget = 1_000_000_000_000;
	let lo = 0;
	let hi = 1;
	while (oreFor(recipes, hi) <= budget) hi *= 2;
	while (hi - lo > 1) {
		const mid = Math.floor((lo + hi) / 2);
		if (oreFor(recipes, mid) <= budget) lo = mid;
		else hi = mid;
	}
	return lo;
}

if (import.meta.main) run(import.meta.url, part1, part2);
