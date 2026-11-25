import { run } from "../../../scripts/aoc.ts";

function fencing(input: string, chargePerSide: boolean): number {
	const rows = input.trim().split(/\r?\n/);
	const width = rows[0].length + 2;
	const border = " ".repeat(width);
	const grid = border + rows.map((row) => " " + row + " ").join("") + border;
	const directions = [1, width, -1, -width];
	const visited = new Uint8Array(grid.length);
	let price = 0;
	for (let start = 0; start < grid.length; start++) {
		const plant = grid[start];
		if (plant === " " || visited[start]) continue;
		const region = [start];
		visited[start] = 1;
		let perimeter = 0;
		let corners = 0;
		for (const cell of region) {
			for (const [i, step] of directions.entries()) {
				const neighbor = cell + step;
				const connected = grid[neighbor] === plant;
				if (!connected) perimeter++;
				else if (!visited[neighbor]) {
					visited[neighbor] = 1;
					region.push(neighbor);
				}
				const turn = directions[(i + 1) % 4];
				const adjacent = grid[cell + turn] === plant;
				if (
					(!connected && !adjacent) ||
					(connected && adjacent && grid[neighbor + turn] !== plant)
				)
					corners++;
			}
		}
		price += region.length * (chargePerSide ? corners : perimeter);
	}
	return price;
}

export function part1(input: string): number {
	return fencing(input, false);
}

export function part2(input: string): number {
	return fencing(input, true);
}

if (import.meta.main) run(import.meta.url, part1, part2);
