import { run } from "../../../scripts/aoc.ts";

function enhance(input: string, steps: number) {
	const [lookup, picture] = input.trim().split(/\r?\n\s*\n/);
	const lit = (c: string) => Number(c === "#");
	const algorithm = Uint8Array.from(lookup.replace(/\s/g, ""), lit);
	let image = picture.split(/\r?\n/).map((row) => Uint8Array.from(row, lit));
	let outside = 0;
	for (let step = 0; step < steps; step++) {
		const next = Array.from(
			{ length: image.length + 2 },
			() => new Uint8Array(image[0].length + 2),
		);
		for (const [y, row] of next.entries()) {
			for (let x = 0; x < row.length; x++) {
				let index = 0;
				for (let oldY = y - 2; oldY <= y; oldY++) {
					for (let oldX = x - 2; oldX <= x; oldX++) {
						index = index * 2 + (image[oldY]?.[oldX] ?? outside);
					}
				}
				row[x] = algorithm[index];
			}
		}
		outside = algorithm[outside ? 511 : 0];
		image = next;
	}
	return outside
		? Infinity
		: image.reduce((sum, row) => sum + row.reduce((a, b) => a + b, 0), 0);
}

export function part1(input: string) {
	return enhance(input, 2);
}
export function part2(input: string) {
	return enhance(input, 50);
}

if (import.meta.main) run(import.meta.url, part1, part2);
