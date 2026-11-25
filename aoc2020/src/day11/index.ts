import { run } from "../../../scripts/aoc.ts";

function stabilize(input: string, visible: boolean) {
	const layout = input.trim().split(/\r?\n/);
	const seats: [number, number][] = [];
	const indices = layout.map((row, y) =>
		Array.from(row, (cell, x) => {
			if (cell === ".") return -1;
			seats.push([x, y]);
			return seats.length - 1;
		}),
	);
	const neighbors = seats.map(([x, y]) => {
		const found: number[] = [];
		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;
				let nx = x + dx;
				let ny = y + dy;
				while (indices[ny]?.[nx] === -1 && visible) {
					nx += dx;
					ny += dy;
				}
				const index = indices[ny]?.[nx];
				if (index !== undefined && index >= 0) found.push(index);
			}
		}
		return found;
	});
	let occupied = seats.map(([x, y]) => layout[y][x] === "#");
	const tolerance = visible ? 5 : 4;
	while (true) {
		let changes = 0;
		const next = occupied.map((taken, index) => {
			const count = neighbors[index].reduce(
				(sum, adjacent) => sum + Number(occupied[adjacent]),
				0,
			);
			const result = taken ? count < tolerance : count === 0;
			if (result !== taken) changes++;
			return result;
		});
		if (changes === 0) return occupied.filter(Boolean).length;
		occupied = next;
	}
}

export function part1(input: string) {
	return stabilize(input, false);
}

export function part2(input: string) {
	return stabilize(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
