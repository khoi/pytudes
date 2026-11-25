import { run } from "../../../scripts/aoc.ts";

function distances(input: string) {
	const graph = new Map<string, Set<string>>([["0,0", new Set()]]);
	let rooms = new Set(["0,0"]);
	const branches: { start: Set<string>; ends: Set<string> }[] = [];
	const moves: Record<string, [number, number]> = {
		N: [0, -1],
		S: [0, 1],
		W: [-1, 0],
		E: [1, 0],
	};
	for (const symbol of input.trim().slice(1, -1)) {
		if (symbol === "(") branches.push({ start: rooms, ends: new Set() });
		else if (symbol === "|" || symbol === ")") {
			const branch = branches.at(-1)!;
			for (const room of rooms) branch.ends.add(room);
			rooms = symbol === "|" ? branch.start : branches.pop()!.ends;
		} else {
			const [dx, dy] = moves[symbol];
			const next = new Set<string>();
			for (const room of rooms) {
				const [x, y] = room.split(",").map(Number);
				const adjacent = `${x + dx},${y + dy}`;
				graph.get(room)!.add(adjacent);
				if (!graph.has(adjacent)) graph.set(adjacent, new Set());
				graph.get(adjacent)!.add(room);
				next.add(adjacent);
			}
			rooms = next;
		}
	}
	const distance = new Map([["0,0", 0]]);
	const queue = ["0,0"];
	for (let i = 0; i < queue.length; i++) {
		const room = queue[i];
		for (const adjacent of graph.get(room)!) {
			if (distance.has(adjacent)) continue;
			distance.set(adjacent, distance.get(room)! + 1);
			queue.push(adjacent);
		}
	}
	return Array.from(distance.values());
}

export const part1 = (input: string) =>
	distances(input).reduce((maximum, value) => Math.max(maximum, value), 0);
export const part2 = (input: string) =>
	distances(input).filter((value) => value >= 1000).length;

if (import.meta.main) run(import.meta.url, part1, part2);
