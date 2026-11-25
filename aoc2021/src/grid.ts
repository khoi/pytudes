export function digitGrid(input: string) {
	const rows = input.trim().split(/\s+/);
	return {
		width: rows[0].length,
		height: rows.length,
		cells: Array.from(rows.join(""), Number),
	};
}

export function* neighbors(
	index: number,
	width: number,
	height: number,
	diagonal = false,
) {
	const x = index % width,
		y = Math.floor(index / width);
	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			if ((!dx && !dy) || (!diagonal && dx && dy)) continue;
			if (x + dx >= 0 && x + dx < width && y + dy >= 0 && y + dy < height) {
				yield index + dy * width + dx;
			}
		}
	}
}
