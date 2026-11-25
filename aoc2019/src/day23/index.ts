import { run } from "../../../scripts/aoc.ts";
import { Intcode } from "../intcode.ts";

function network(input: string, repeat: boolean) {
	const program = new Intcode(input);
	const nodes = Array.from({ length: 50 }, (_, address) => ({
		machine: program.clone(),
		inbox: [address],
		output: [] as number[],
	}));
	let nat: number[] | undefined;
	let previousY: number | undefined;
	while (true) {
		let idle = true;
		for (const node of nodes) {
			const received = node.inbox.splice(0);
			const outgoing = node.machine.run(received.length ? received : [-1]);
			if (received.length || outgoing.length) idle = false;
			node.output.push(...outgoing);
			while (node.output.length >= 3) {
				const [address, x, y] = node.output.splice(0, 3);
				if (address === 255) {
					if (!repeat) return y;
					nat = [x, y];
				} else {
					nodes[address].inbox.push(x, y);
				}
			}
			if (node.output.length) idle = false;
		}
		if (idle && nat) {
			const [x, y] = nat;
			if (y === previousY) return y;
			previousY = y;
			nodes[0].inbox.push(x, y);
		}
	}
}

export function part1(input: string) {
	return network(input, false);
}
export function part2(input: string) {
	return network(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
