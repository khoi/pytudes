import { run } from "../../../scripts/aoc.ts";
import { PriorityQueue } from "../../../scripts/priority-queue.ts";

const kinds = "ABCD";
const doors = [2, 4, 6, 8];
const prices = [1, 10, 100, 1000];
const stops = [0, 1, 3, 5, 7, 9, 10];

function clearHall(state: string, start: number, end: number) {
	const direction = Math.sign(end - start);
	for (let x = start; x !== end; ) {
		x += direction;
		if (state[x] !== ".") return false;
	}
	return true;
}

function moved(state: string, from: number, to: number) {
	const copy = state.split("");
	copy[to] = copy[from];
	copy[from] = ".";
	return copy.join("");
}

function moves(state: string, depth: number) {
	const next: [string, number][] = [];
	for (const x of stops) {
		const room = kinds.indexOf(state[x]);
		if (room < 0 || !clearHall(state, x, doors[room])) continue;
		const start = 11 + room * depth;
		const slots = state.slice(start, start + depth);
		const target = slots.lastIndexOf(".");
		if (target < 0 || [...slots].some((v) => v !== "." && v !== state[x]))
			continue;
		next.push([
			moved(state, x, start + target),
			prices[room] * (Math.abs(x - doors[room]) + target + 1),
		]);
	}
	if (next.length) return next;
	for (const [room, door] of doors.entries()) {
		const start = 11 + room * depth;
		const slots = state.slice(start, start + depth);
		const top = slots.search(/[ABCD]/);
		if (top < 0 || slots.slice(top) === kinds[room].repeat(depth - top))
			continue;
		const price = prices[kinds.indexOf(slots[top])];
		for (const x of stops) {
			if (clearHall(state, door, x)) {
				next.push([
					moved(state, start + top, x),
					price * (top + 1 + Math.abs(door - x)),
				]);
			}
		}
	}
	return next;
}

function minimumRemaining(state: string, depth: number) {
	let cost = 0;
	for (const x of stops) {
		const kind = kinds.indexOf(state[x]);
		if (kind >= 0) cost += prices[kind] * (Math.abs(x - doors[kind]) + 1);
	}
	for (const [room, door] of doors.entries()) {
		const start = 11 + room * depth;
		let needed = depth;
		while (needed && state[start + needed - 1] === kinds[room]) needed--;
		cost += (prices[room] * needed * (needed - 1)) / 2;
		for (let i = 0; i < needed; i++) {
			const kind = kinds.indexOf(state[start + i]);
			if (kind >= 0)
				cost += prices[kind] * (i + 1 + Math.abs(door - doors[kind]) + 1);
		}
	}
	return cost;
}

function organize(input: string, unfold: boolean) {
	const lines = input.trimEnd().split(/\r?\n/);
	const rows = lines
		.slice(2)
		.map((row) => [...row].filter((c) => ".ABCD".includes(c)))
		.filter((row) => row.length);
	if (unfold && rows.length === 2) rows.splice(1, 0, [..."DCBA"], [..."DBAC"]);
	const depth = rows.length;
	const start =
		lines[1].slice(1, 12) +
		doors.map((_, i) => rows.map((row) => row[i]).join("")).join("");
	const goal = ".".repeat(11) + [...kinds].map((k) => k.repeat(depth)).join("");
	const best = new Map([[start, 0]]);
	const queue = new PriorityQueue<{
		state: string;
		cost: number;
		estimate: number;
	}>((a, b) => a.estimate - b.estimate);
	queue.push({
		state: start,
		cost: 0,
		estimate: minimumRemaining(start, depth),
	});
	while (queue.size) {
		const { state, cost } = queue.pop();
		if (best.get(state) !== cost) continue;
		if (state === goal) return cost;
		for (const [next, price] of moves(state, depth)) {
			const total = cost + price;
			if (total >= (best.get(next) ?? Infinity)) continue;
			best.set(next, total);
			queue.push({
				state: next,
				cost: total,
				estimate: total + minimumRemaining(next, depth),
			});
		}
	}
	throw new Error("No route to organize the burrow");
}

export function part1(input: string) {
	return organize(input, false);
}
export function part2(input: string) {
	return organize(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
