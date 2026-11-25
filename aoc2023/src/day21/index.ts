import { run } from "../../../scripts/aoc.ts";

function garden(input: string) {
	const rows = input.trim().split(/\r?\n/);
	const sy = rows.findIndex((row) => row.includes("S"));
	return {
		rows,
		width: rows[0].length,
		height: rows.length,
		sx: rows[sy].indexOf("S"),
		sy,
	};
}
type Garden = ReturnType<typeof garden>;

function distances(plot: Garden, radius: number) {
	const { rows, width, height, sx, sy } = plot;
	const cols = (2 * radius + 1) * width;
	const size = cols * (2 * radius + 1) * height;
	const cells = new Int32Array(size).fill(-1);
	const queue = new Int32Array(size);
	const start = (radius * height + sy) * cols + radius * width + sx;
	queue[0] = start;
	cells[start] = 0;
	let tail = 1;
	function visit(next: number, distance: number) {
		if (
			cells[next] !== -1 ||
			rows[Math.floor(next / cols) % height][next % width] === "#"
		)
			return;
		cells[next] = distance;
		queue[tail++] = next;
	}
	for (let head = 0; head < tail; head++) {
		const cell = queue[head];
		const x = cell % cols,
			distance = cells[cell] + 1;
		if (x > 0) visit(cell - 1, distance);
		if (x + 1 < cols) visit(cell + 1, distance);
		if (cell >= cols) visit(cell - cols, distance);
		if (cell + cols < size) visit(cell + cols, distance);
	}
	return {
		cells,
		connected: tail > 1,
		at(tx: number, ty: number, x: number, y: number) {
			const distance =
				cells[((ty + radius) * height + y) * cols + (tx + radius) * width + x];
			return distance === -1 ? Infinity : distance;
		},
	};
}

function countPatch(patch: ReturnType<typeof distances>, steps: number) {
	if (!patch.connected) return Number(steps === 0);
	let count = 0;
	for (const d of patch.cells) {
		if (d >= 0 && d <= steps && d % 2 === steps % 2) count++;
	}
	return count;
}

export function part1(input: string, steps = 64) {
	return countPatch(distances(garden(input), 0), steps);
}

function linearTiling(
	plot: Garden,
	radius: number,
	patch: ReturnType<typeof distances>,
) {
	const { width, height, rows, sx, sy } = plot;
	function predicted(x: number, y: number) {
		const tx = Math.floor(x / width),
			ty = Math.floor(y / height);
		const bx = Math.max(-radius, Math.min(radius, tx)),
			by = Math.max(-radius, Math.min(radius, ty));
		return (
			patch.at(bx, by, x - tx * width, y - ty * height) +
			width * Math.abs(tx - bx) +
			height * Math.abs(ty - by)
		);
	}
	const probe = radius + 1;
	for (let y = -probe * height; y < (probe + 1) * height; y++) {
		const row = rows[((y % height) + height) % height];
		for (let x = -probe * width; x < (probe + 1) * width; x++) {
			if ((x === sx && y === sy) || row[((x % width) + width) % width] === "#")
				continue;
			const neighbor = Math.min(
				predicted(x - 1, y),
				predicted(x + 1, y),
				predicted(x, y - 1),
				predicted(x, y + 1),
			);
			if (predicted(x, y) !== neighbor + 1) return false;
		}
	}
	return true;
}

function lineCount(remaining: number, stride: number) {
	const last = Math.floor(remaining / stride);
	if (stride % 2 === 0) return remaining % 2 === 0 ? last + 1 : 0;
	return Math.floor((last - (remaining % 2)) / 2) + 1;
}

function countCopies(remaining: number, dx: number, dy: number) {
	if (!dx && !dy) return Number(remaining % 2 === 0);
	if (!dx || !dy) return lineCount(remaining, dx || dy);
	if (dx === dy) {
		const last = Math.floor(remaining / dx);
		if (dx % 2 === 0)
			return remaining % 2 === 0 ? ((last + 1) * (last + 2)) / 2 : 0;
		const levels = lineCount(remaining, dx);
		return levels * (levels + (remaining % 2));
	}
	let count = 0;
	for (let row = 0; row * dy <= remaining; row++)
		count += lineCount(remaining - row * dy, dx);
	return count;
}

export function part2(input: string, steps = 26_501_365) {
	const plot = garden(input);
	const { width, height } = plot;
	for (let radius = 1; ; radius++) {
		const patch = distances(plot, radius);
		if (!patch.connected || steps <= radius * Math.min(width, height))
			return countPatch(patch, steps);
		if (!linearTiling(plot, radius, patch)) continue;
		let total = 0;
		for (let ty = -radius; ty <= radius; ty++)
			for (let tx = -radius; tx <= radius; tx++) {
				const dx = Math.abs(tx) === radius ? width : 0;
				const dy = Math.abs(ty) === radius ? height : 0;
				for (let y = 0; y < height; y++)
					for (let x = 0; x < width; x++) {
						const distance = patch.at(tx, ty, x, y);
						if (distance <= steps)
							total += countCopies(steps - distance, dx, dy);
					}
			}
		return total;
	}
}

if (import.meta.main) run(import.meta.url, part1, part2);
