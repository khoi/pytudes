import { run } from "../../../scripts/aoc.ts";

type ButtonSubset = { increments: number[]; presses: number };

function machines(input: string) {
	return input
		.trim()
		.split("\n")
		.map((line) => {
			const lights = [...line.match(/\[([.#]+)\]/)![1]].map((light) =>
				Number(light === "#"),
			);
			const buttons = [...line.matchAll(/\(([\d,]+)\)/g)].map((match) =>
				match[1].split(",").map(Number),
			);
			const joltage = line
				.match(/\{([\d,]+)\}/)![1]
				.split(",")
				.map(Number);
			return { lights, buttons, joltage };
		});
}

function parity(counters: number[]) {
	return counters.map((n) => n % 2).join("");
}

function subsetsByParity(buttons: number[][], counters: number) {
	const subsets = new Map<string, ButtonSubset[]>();
	const increments = Array<number>(counters).fill(0);

	function visit(button: number, presses: number) {
		if (button === buttons.length) {
			const key = parity(increments);
			const group = subsets.get(key) ?? [];
			group.push({ increments: increments.slice(), presses });
			subsets.set(key, group);
			return;
		}
		visit(button + 1, presses);
		for (const i of buttons[button]) increments[i]++;
		visit(button + 1, presses + 1);
		for (const i of buttons[button]) increments[i]--;
	}
	visit(0, 0);
	return subsets;
}

export function part1(input: string): number {
	let total = 0;
	for (const { buttons, lights } of machines(input)) {
		const matches =
			subsetsByParity(buttons, lights.length).get(parity(lights)) ?? [];
		total += matches.reduce(
			(best, subset) => Math.min(best, subset.presses),
			Infinity,
		);
	}
	return total;
}

function minimumPresses(buttons: number[][], joltage: number[]) {
	const subsets = subsetsByParity(buttons, joltage.length);
	const memo = new Map<string, number>();

	function solve(target: number[]): number {
		if (target.every((n) => n === 0)) return 0;
		const key = target.join(",");
		const known = memo.get(key);
		if (known !== undefined) return known;

		let best = Infinity;
		for (const { increments, presses } of subsets.get(parity(target)) ?? []) {
			if (increments.some((n, i) => n > target[i])) continue;
			const remainingPairs = target.map((n, i) => (n - increments[i]) / 2);
			best = Math.min(best, presses + 2 * solve(remainingPairs));
		}
		memo.set(key, best);
		return best;
	}
	return solve(joltage);
}

export function part2(input: string): number {
	return machines(input).reduce(
		(sum, machine) => sum + minimumPresses(machine.buttons, machine.joltage),
		0,
	);
}

if (import.meta.main) run(import.meta.url, part1, part2);
