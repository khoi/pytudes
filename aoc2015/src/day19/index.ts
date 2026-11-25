import { run } from "../../../scripts/aoc.ts";

function parse(input: string) {
	const [recipes, molecule] = input.trim().split(/\r?\n\r?\n/);
	const rules = recipes.split(/\r?\n/).map((line) => line.split(" => "));
	return { rules, molecule };
}

export function part1(input: string): number {
	const { rules, molecule } = parse(input);
	const products = new Set<string>();
	for (const [from, to] of rules) {
		for (
			let start = molecule.indexOf(from);
			start !== -1;
			start = molecule.indexOf(from, start + 1)
		) {
			products.add(
				molecule.slice(0, start) + to + molecule.slice(start + from.length),
			);
		}
	}
	return products.size;
}

type Production = { parent: string; right: string; cost: number };
type Costs = Map<string, number>;

function atoms(formula: string): string[] {
	return formula.match(/[A-Z][a-z]?|e/g) ?? [];
}

export function part2(input: string): number {
	const { rules, molecule } = parse(input);
	const binary = new Map<string, Production[]>();
	const unary = new Map<string, string[]>();
	let auxiliary = 0;
	for (const [from, to] of rules) {
		const symbols = atoms(to);
		if (symbols.length === 1) {
			const parents = unary.get(to) ?? [];
			parents.push(from);
			unary.set(to, parents);
			continue;
		}
		let parent = from;
		for (let i = 0; i < symbols.length - 1; i++) {
			const right =
				i === symbols.length - 2 ? symbols[i + 1] : "#" + auxiliary++;
			const alternatives = binary.get(symbols[i]) ?? [];
			alternatives.push({ parent, right, cost: Number(i === 0) });
			binary.set(symbols[i], alternatives);
			parent = right;
		}
	}

	function includeUnaryRules(costs: Costs) {
		const pending = [...costs.keys()];
		for (let i = 0; i < pending.length; i++) {
			const symbol = pending[i];
			const cost = costs.get(symbol)! + 1;
			for (const parent of unary.get(symbol) ?? []) {
				if (cost < (costs.get(parent) ?? Infinity)) {
					costs.set(parent, cost);
					pending.push(parent);
				}
			}
		}
	}

	const target = atoms(molecule);
	const chart: Costs[][] = target.map(() => []);
	for (let length = 1; length <= target.length; length++) {
		for (let start = 0; start + length <= target.length; start++) {
			const end = start + length;
			const costs: Costs = new Map();
			chart[start][end] = costs;
			if (length === 1) costs.set(target[start], 0);
			for (let split = start + 1; split < end; split++) {
				const rightCosts = chart[split][end];
				if (!rightCosts.size) continue;
				for (const [left, leftCost] of chart[start][split]) {
					for (const rule of binary.get(left) ?? []) {
						const rightCost = rightCosts.get(rule.right);
						if (rightCost === undefined) continue;
						const cost = leftCost + rightCost + rule.cost;
						if (cost < (costs.get(rule.parent) ?? Infinity))
							costs.set(rule.parent, cost);
					}
				}
			}
			includeUnaryRules(costs);
		}
	}
	const steps = chart[0][target.length].get("e");
	if (steps === undefined) throw new Error("Molecule cannot be synthesized");
	return steps;
}

if (import.meta.main) run(import.meta.url, part1, part2);
