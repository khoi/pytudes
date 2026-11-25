import { run } from "../../../scripts/aoc.ts";

function warehouse(input: string, boxWidth: number) {
	const [map, instructions] = input.trim().split(/\r?\n\s*\n/);
	const rows = map.split(/\r?\n/);
	const width = rows[0].length * boxWidth;
	const walls = new Set<number>();
	const boxes = new Set<number>();
	let robot = 0;
	for (const [y, row] of rows.entries()) {
		for (const [x, tile] of [...row].entries()) {
			const p = y * width + x * boxWidth;
			if (tile === "O") boxes.add(p);
			if (tile === "@") robot = p;
			if (tile === "#") for (let i = 0; i < boxWidth; i++) walls.add(p + i);
		}
	}

	function boxAt(position: number) {
		if (boxes.has(position)) return position;
		if (boxWidth === 2 && boxes.has(position - 1)) return position - 1;
	}

	const steps: Record<string, number> = {
		"<": -1,
		">": 1,
		"^": -width,
		v: width,
	};
	for (const move of instructions.replace(/\s/g, "")) {
		const delta = steps[move];
		const next = robot + delta;
		if (walls.has(next)) continue;
		const front = boxAt(next);
		const pushed = new Set<number>(front === undefined ? [] : [front]);
		let blocked = false;
		for (const box of pushed) {
			for (let i = 0; i < boxWidth; i++) {
				const target = box + i + delta;
				if (walls.has(target)) blocked = true;
				const other = boxAt(target);
				if (other !== undefined) pushed.add(other);
			}
			if (blocked) break;
		}
		if (blocked) continue;
		for (const box of pushed) boxes.delete(box);
		for (const box of pushed) boxes.add(box + delta);
		robot = next;
	}
	let sum = 0;
	for (const box of boxes) sum += 100 * Math.floor(box / width) + (box % width);
	return sum;
}

export function part1(input: string) {
	return warehouse(input, 1);
}
export function part2(input: string) {
	return warehouse(input, 2);
}

if (import.meta.main) run(import.meta.url, part1, part2);
