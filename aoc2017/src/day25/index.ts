import { run } from "../../../scripts/aoc.ts";

type Action = { write: number; move: number; state: string };

export function part1(input: string): number {
	const [header, ...blocks] = input.trim().split(/\r?\n\s*\r?\n/);
	let state = header.match(/Begin in state (\w+)\./)![1];
	const steps = Number(header.match(/after (\d+) steps?/)![1]);
	const rules = new Map<string, Action[]>();
	for (const block of blocks) {
		const name = block.match(/In state (\w+):/)![1];
		const actions: Action[] = [];
		const pattern =
			/If the current value is ([01]):\s*- Write the value ([01])\.\s*- Move one slot to the (left|right)\.\s*- Continue with state (\w+)\./g;
		for (const [, bit, write, direction, next] of block.matchAll(pattern)) {
			actions[Number(bit)] = {
				write: Number(write),
				move: direction === "right" ? 1 : -1,
				state: next,
			};
		}
		rules.set(name, actions);
	}
	const ones = new Set<number>();
	let head = 0;
	for (let step = 0; step < steps; step++) {
		const action = rules.get(state)![Number(ones.has(head))];
		if (action.write === 1) ones.add(head);
		else ones.delete(head);
		head += action.move;
		state = action.state;
	}
	return ones.size;
}

if (import.meta.main) run(import.meta.url, part1);
