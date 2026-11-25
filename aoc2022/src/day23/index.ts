import { run } from "../../../scripts/aoc.ts";

type Elf = { x: number; y: number };
const key = (x: number, y: number) => x + "," + y;
const directions = [
	[0, -1],
	[0, 1],
	[-1, 0],
	[1, 0],
];

function parse(input: string): Elf[] {
	const elves: Elf[] = [];
	for (const [y, row] of input.trim().split(/\r?\n/).entries()) {
		for (let x = 0; x < row.length; x++) {
			if (row[x] === "#") elves.push({ x, y });
		}
	}
	return elves;
}

function round(elves: Elf[], turn: number): boolean {
	const occupied = new Set(elves.map(({ x, y }) => key(x, y)));
	const proposals = new Map<string, Elf | null>();
	for (const elf of elves) {
		const { x, y } = elf;
		const clear = directions.map(([dx, dy]) => {
			for (let i = -1; i <= 1; i++) {
				if (occupied.has(key(x + dx + dy * i, y + dy + dx * i))) return false;
			}
			return true;
		});
		if (clear.every(Boolean)) continue;
		for (let i = 0; i < 4; i++) {
			const dir = (turn + i) % 4;
			if (!clear[dir]) continue;
			const [dx, dy] = directions[dir];
			const destination = key(x + dx, y + dy);
			proposals.set(destination, proposals.has(destination) ? null : elf);
			break;
		}
	}
	let moved = false;
	for (const [destination, elf] of proposals) {
		if (!elf) continue;
		[elf.x, elf.y] = destination.split(",").map(Number);
		moved = true;
	}
	return moved;
}

export function part1(input: string): number {
	const elves = parse(input);
	for (let t = 0; t < 10; t++) round(elves, t);
	const xs = elves.map((elf) => elf.x);
	const ys = elves.map((elf) => elf.y);
	return (
		(Math.max(...xs) - Math.min(...xs) + 1) *
			(Math.max(...ys) - Math.min(...ys) + 1) -
		elves.length
	);
}

export function part2(input: string): number {
	const elves = parse(input);
	let turn = 0;
	while (round(elves, turn)) turn++;
	return turn + 1;
}

if (import.meta.main) run(import.meta.url, part1, part2);
