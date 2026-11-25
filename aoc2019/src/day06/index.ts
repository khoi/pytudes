import { run } from "../../../scripts/aoc.ts";

function orbits(input: string): Map<string, string> {
	const parents = new Map<string, string>();
	for (const orbit of input.trim().split(/\s+/)) {
		const [parent, child] = orbit.split(")");
		parents.set(child, parent);
	}
	return parents;
}

export function part1(input: string): number {
	const parents = orbits(input);
	const depth = new Map([["COM", 0]]);
	let total = 0;
	for (const child of parents.keys()) {
		let node = child;
		const path: string[] = [];
		while (!depth.has(node)) {
			path.push(node);
			node = parents.get(node)!;
		}
		let distance = depth.get(node)!;
		for (const ancestor of path.reverse()) depth.set(ancestor, ++distance);
		total += depth.get(child)!;
	}
	return total;
}

export function part2(input: string): number {
	const parents = orbits(input);
	const fromYou = new Map<string, number>();
	let node = parents.get("YOU");
	while (node !== undefined) {
		fromYou.set(node, fromYou.size);
		node = parents.get(node);
	}
	node = parents.get("SAN");
	for (let steps = 0; node !== undefined; steps++, node = parents.get(node)) {
		if (fromYou.has(node)) return fromYou.get(node)! + steps;
	}
	throw new Error("No shared orbit");
}

if (import.meta.main) run(import.meta.url, part1, part2);
